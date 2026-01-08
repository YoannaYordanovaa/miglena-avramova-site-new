require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const multer = require("multer");

const upload = multer();
const app = express();

// 1. Middleware настройки
app.use(cors()); // Позволява на React (порт 5173) да говори със сървъра (порт 3010)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. База данни
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

// 3. API Ендпоинти за продукти
app.get("/getProducts", (req, res) => {
  let sql = "SELECT * FROM forever_table";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getDrinks", (req, res) => {
  let sql = 'SELECT * FROM forever_table WHERE category = "Напитки"';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getSupplements", (req, res) => {
  let sql = 'SELECT * FROM forever_table WHERE category = "Добавки"';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getFace", (req, res) => {
  let sql = 'SELECT * FROM forever_table WHERE category = "Грижа за лицето"';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getBody", (req, res) => {
  let sql = 'SELECT * FROM forever_table WHERE category = "Грижа за тялото"';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getPersonalhygiene", (req, res) => {
  let sql = 'SELECT * FROM forever_table WHERE category = "Лична хигиена"';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getWeightcontrol", (req, res) => {
  let sql = 'SELECT * FROM forever_table WHERE category = "Контрол на теглото"';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get("/getPackages", (req, res) => {
  let sql = 'SELECT * FROM forever_table WHERE category = "Пакети"';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Единичен продукт
app.get("/getProductDetails/:productId", (req, res) => {
  const productId = req.params.productId;
  let sql = "SELECT * FROM forever_table WHERE id = ?";
  db.query(sql, [productId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// 4. Изпращане на форма (Nodemailer)
app.post("/submit-form", upload.none(), (req, res) => {
  const { name, phone, message } = req.body;

  // Използваме твоя Gmail адрес за получател
  const targetEmail = "miglena.avramova.as@gmail.com";

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,    // Твоят имейл в .env
      pass: process.env.EMAIL_PASSWORD, // Твоята App Password в .env
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: targetEmail,
    subject: `Ново съобщение от сайта от ${name}`,
    html: `
      <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #c48b7d;">Ново запитване за екипа</h2>
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
      console.log("Email sent: " + info.response);
      res.status(200).json({ success: true, message: "Изпратено успешно!" });
    }
  });
});

// 5. Стартиране
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});