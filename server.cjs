require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");

const app = express();

// --- 1. MIDDLEWARE НАСТРОЙКИ ---
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Обслужване на статични файлове (снимки за новините)
// Това позволява снимките да се достъпват на: miglenaavramova.com/uploads/news/име.jpg
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// --- 2. КОНФИГУРАЦИЯ НА MULTER (ЗА КАЧВАНЕ НА СНИМКИ) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "public/uploads/news/";
    // Автоматично създаване на папката, ако липсва
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Генерираме уникално име: дата + случайни числа
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// --- 3. БАЗА ДАННИ ---
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Грешка при свързване с БД:", err.message);
    return;
  }
  console.log("Успешно свързване с MySQL базата данни");
});

// --- 4. API ЕНДПОИНТИ ЗА ПРОДУКТИ ---
app.get("/getProducts", (req, res) => {
  db.query("SELECT * FROM forever_table", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getDrinks", (req, res) => {
  db.query('SELECT * FROM forever_table WHERE category = "Напитки"', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getSupplements", (req, res) => {
  db.query('SELECT * FROM forever_table WHERE category = "Добавки"', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getFace", (req, res) => {
  db.query('SELECT * FROM forever_table WHERE category = "Грижа за лицето"', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getBody", (req, res) => {
  db.query('SELECT * FROM forever_table WHERE category = "Грижа за тялото"', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getPersonalhygiene", (req, res) => {
  db.query('SELECT * FROM forever_table WHERE category = "Лична хигиена"', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getWeightcontrol", (req, res) => {
  db.query('SELECT * FROM forever_table WHERE category = "Контрол на теглото"', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getPackages", (req, res) => {
  db.query('SELECT * FROM forever_table WHERE category = "Пакети"', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getProductDetails/:productId", (req, res) => {
  db.query("SELECT * FROM forever_table WHERE id = ?", [req.params.productId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// --- 5. API ЕНДПОИНТИ ЗА НОВИНИ (БЛОГ) ---

// Вземане на новините
app.get("/getNews", (req, res) => {
  db.query("SELECT * FROM news ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Записване на нова новина от AdminPanel
app.post("/saveNews", upload.single("image"), (req, res) => {
  const { title, text, buttonText, buttonLink, date } = req.body;
  // Пътят, който записваме в базата данни
  const imagePath = req.file ? `/uploads/news/${req.file.filename}` : null;

  const sql = "INSERT INTO news (title, image, text, buttonText, buttonLink, date) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [title, imagePath, text, buttonText, buttonLink, date];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Грешка при запис в базата:", err);
      return res.status(500).json({ success: false, error: "Грешка в базата данни" });
    }
    res.json({ success: true, message: "Статията е запазена успешно!" });
  });
});

// Обновяване на съществуваща новина
app.post("/updateNews/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title, text, buttonText, buttonLink, date } = req.body;
  
  // Проверяваме дали е качена нова снимка
  const newImagePath = req.file ? `/uploads/news/${req.file.filename}` : null;

  let sql;
  let values;

  if (newImagePath) {
    // Ако има нова снимка, обновяваме и пътя към нея
    sql = "UPDATE news SET title = ?, image = ?, text = ?, buttonText = ?, buttonLink = ?, date = ? WHERE id = ?";
    values = [title, newImagePath, text, buttonText, buttonLink, date, id];
  } else {
    // Ако няма нова снимка, запазваме старата
    sql = "UPDATE news SET title = ?, text = ?, buttonText = ?, buttonLink = ?, date = ? WHERE id = ?";
    values = [title, text, buttonText, buttonLink, date, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Грешка при обновяване в базата:", err);
      return res.status(500).json({ success: false, error: "Грешка в базата данни" });
    }
    res.json({ success: true, message: "Статията е обновена успешно!" });
  });
});

// Изтриване на новина
app.delete("/deleteNews/:id", (req, res) => {
  db.query("DELETE FROM news WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

// --- 6. ИЗПРАЩАНЕ НА ФОРМА (NODEMAILER) ---
app.post("/submit-form", upload.none(), (req, res) => {
  const { name, phone, message } = req.body;
  const targetEmail = "miglena.avramova.as@gmail.com";

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: targetEmail,
    subject: `Ново съобщение от сайта от ${name}`,
    html: `
      <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #74ab1a;">Ново запитване: </h2>
        <p><strong>Име:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Съобщение:</strong></p>
        <div style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</div>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Грешка при имейл:", error);
      res.status(500).json({ success: false, message: "Грешка при изпращане." });
    } else {
      res.status(200).json({ success: true, message: "Изпратено успешно!" });
    }
  });
});

// --- 7. СТАРТИРАНЕ ---
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});