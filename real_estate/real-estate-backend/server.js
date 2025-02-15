require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "real_estate",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) console.error("❌ Database connection failed:", err);
  else console.log("✅ Connected to MySQL");
});

// 🔹 Register API
app.post("/register", (req, res) => {
  const { name, email, phoneNumber, country, password } = req.body;
  if (!name || !email || !phoneNumber || !country || !password) 
    return res.status(400).json({ error: "All fields are required" });

  const hashedPassword = bcrypt.hashSync(password, 10);
  db.query(
    "INSERT INTO users (name, email, phoneNumber, country, password) VALUES (?, ?, ?, ?, ?)",
    [name, email, phoneNumber, country, hashedPassword],
    (err) => {
      if (err) return res.status(500).json({ error: "Registration failed" });
      res.json({ message: "✅ User registered successfully" });
    }
  );
});

// 🔹 Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: "Invalid email" });

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    res.json({ token, user });
  });
});

// 🔹 Send OTP API (Email)
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: "Email not found" });

    const otp = crypto.randomInt(100000, 999999);
    const expiry = Date.now() + 15 * 60 * 1000; // 15 min expiry

    db.query("UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?", [otp, expiry, email]);

    // 🔹 Send OTP via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: { user: "process.env.ryanldib@gmail.com", pass: "process.env.Headlines122" }
    });

    const mailOptions = {
      from: "ryanldib@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP verification code is: ${otp}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ message: "✅ OTP sent to email" });
    } catch (error) {
      console.error("Nodemailer error:", error);
      res.status(500).json({ error: "Failed to send OTP" });
    }
  });
});

// ✅ Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
