require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const sharp = require("sharp");
const winston = require("winston");

const app = express();

// --- 0. КОНФИГУРАЦИЯ НА ЛОГЕР (Winston) ---
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Само грешки
    new winston.transports.File({ filename: "logs/combined.log" }), // Всички събития
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() }),
  );
}

app.get("/test", (req, res) => {
  res.send("Server is alive!");
});

// --- 1. СИГУРНОСТ (HELMET & CORS) ---
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const corsOptions = {
  origin: [
    "https://miglenaavramova.com", 
    "https://www.miglenaavramova.com",
    "http://localhost:5173" // остави го за локални тестове
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
app.use(cors(corsOptions));

// --- 2. ОГРАНИЧАВАНЕ НА ЗАЯВКИТЕ ---
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Твърде много заявки." },
});

app.use("/getNews", generalLimiter);

app.get("/getNews", async (req, res) => {
  try {
    const [results] = await db.execute("SELECT * FROM news ORDER BY id DESC");
    res.json(results);
  } catch (err) {
    console.error("!!! DATABASE ERROR:", err);
    res.status(500).json({ error: "DB Error", details: err.message });
  }
});

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: "Опитайте отново след час." },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: "Лимитът за съобщения е достигнат." },
});

// --- 3. СТАТИЧНИ ФАЙЛОВЕ ---
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// --- 4. MIDDLEWARE ЗА JWT ЗАЩИТА ---
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(403).json({ success: false, message: "Няма токен." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ success: false, message: "Невалиден токен." });
    req.userId = decoded.id;
    next();
  });
};

// --- 5. CONFIG НА MULTER (Memory Storage за Sharp) ---
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Невалиден формат!"), false);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

// --- 6. БАЗА ДАННИ ---
const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();

// --- 7. ВАЛИДАЦИЯ ---
const validateNews = (req, res, next) => {
  const { title, text } = req.body;
  if (!title || title.trim().length < 3) {
    return res.status(400).json({ message: "Заглавието е твърде кратко." });
  }
  if (title.length > 80) {
    return res
      .status(400)
      .json({ message: "Заглавието не може да бъде над 80 символа." });
  }
  next();
};

// --- ЕНДПОИНТИ ЗА ПРОДУКТИ (Спрямо api.js) ---

// Общ маршрут за всички продукти
app.get("/getProducts", async (req, res) => {
  try {
    const [results] = await db.execute("SELECT * FROM products");
    res.json(results);
  } catch (err) {
    logger.error(`Грешка при getProducts: ${err.message}`);
    res.status(500).json({ error: "DB Error" });
  }
});

// Специфични категории
const categories = {
  "/getDrinks": "Напитки",
  "/getSupplements": "Добавки",
  "/getFace": "Грижа за лицето",
  "/getBody": "Грижа за тялото",
  "/getPersonalhygiene": "Лична хигиена",
  "/getWeightcontrol": "Контрол на теглото",
  "/getPackages": "Пакети"
};

Object.entries(categories).forEach(([path, dbCategory]) => {
  app.get(path, async (req, res) => {
    try {
      const [results] = await db.execute("SELECT * FROM products WHERE category = ?", [dbCategory]);
      res.json(results);
    } catch (err) {
      logger.error(`Грешка при ${path}: ${err.message}`);
      res.status(500).json({ error: "DB Error" });
    }
  });
});

// Детайли за поръчка (използва се в getOrderUrl в api.js)
app.get("/getProductDetails/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "DB Error" });
  }
});

// --- 8. ЕНДПОИНТИ ---

app.post("/admin/login", loginLimiter, async (req, res) => {
  const { password } = req.body;
  const isMatch = await bcrypt.compare(password, process.env.ADMIN_HASH);

  if (isMatch) {
    const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: "Грешна парола!" });
});

// ЗАПИС С ОПТИМИЗАЦИЯ (Sharp)
app.post(
  "/saveNews",
  verifyToken,
  upload.single("image"),
  validateNews,
  async (req, res) => {
    try {
      const { title, text, buttonText, buttonLink, date } = req.body;
      let imagePath = null;

      if (req.file) {
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
        const dir = path.join(__dirname, "public", "uploads", "news");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const fullPath = path.join(dir, fileName);

        await sharp(req.file.buffer)
          .resize(1200, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(fullPath);

        imagePath = `/uploads/news/${fileName}`;
      }

      const sql =
        "INSERT INTO news (title, image, text, buttonText, buttonLink, date) VALUES (?, ?, ?, ?, ?, ?)";
      await db.execute(sql, [
        title,
        imagePath,
        text,
        buttonText,
        buttonLink,
        date,
      ]);
      res.json({ success: true, message: "Статията е запазена успешно!" });
    } catch (err) {
      logger.error(`Грешка при запис на новина: ${err.message}`);
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// ОБНОВЯВАНЕ НА СТАТИЯ
app.post(
  "/updateNews/:id",
  verifyToken,
  upload.single("image"),
  validateNews,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, text, buttonText, buttonLink } = req.body;
      let imagePath = null;

      if (req.file) {
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
        const dir = path.join(__dirname, "public", "uploads", "news");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const fullPath = path.join(dir, fileName);

        await sharp(req.file.buffer)
          .resize(1200, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(fullPath);

        imagePath = `/uploads/news/${fileName}`;

        const [rows] = await db.execute("SELECT image FROM news WHERE id = ?", [
          id,
        ]);
        if (rows.length > 0 && rows[0].image) {
          const oldFilePath = path.join(__dirname, "public", rows[0].image);
          if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }
      }

      let sql, params;
      if (imagePath) {
        sql =
          "UPDATE news SET title = ?, image = ?, text = ?, buttonText = ?, buttonLink = ? WHERE id = ?";
        params = [title, imagePath, text, buttonText, buttonLink, id];
      } else {
        sql =
          "UPDATE news SET title = ?, text = ?, buttonText = ?, buttonLink = ? WHERE id = ?";
        params = [title, text, buttonText, buttonLink, id];
      }

      await db.execute(sql, params);
      res.json({ success: true, message: "Статията е обновена успешно!" });
    } catch (err) {
      logger.error(`Грешка при обновяване на новина: ${err.message}`);
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

app.delete("/deleteNews/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.execute("SELECT image FROM news WHERE id = ?", [
      id,
    ]);
    if (rows.length > 0 && rows[0].image) {
      const filePath = path.join(__dirname, "public", rows[0].image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await db.execute("DELETE FROM news WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    logger.error(`Грешка при триене: ${err.message}`);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/submit-form", contactLimiter, upload.none(), async (req, res) => {
  const { name, phone, message, honeypot } = req.body;
  if (honeypot) return res.status(200).json({ success: true });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "miglena.avramova.as@gmail.com",
      subject: `Ново запитване от ${name}`,
      html: `<p><strong>Име:</strong> ${name}</p><p><strong>Тел:</strong> ${phone}</p><p><strong>Съобщение:</strong> ${message}</p>`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    logger.error(`Имейл грешка: ${error.message}`);
    res.status(500).json({ success: false });
  }
});

// Глобален Error Handler с логване (Winston)
app.use((err, req, res, next) => {
  logger.error(
    `${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );
  res
    .status(500)
    .json({ success: false, message: "Вътрешна грешка в сървъра." });
});

const PORT = process.env.PORT || 3011;
app.listen(PORT, () =>
  console.log(`✅ Професионално защитен сървър на порт ${PORT}`),
);
