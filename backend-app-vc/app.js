// app.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app_vc_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key_here";

// Register endpoint
app.post("/register", async (req, res) => {
  const { dni, username, password, role } = req.body;

  // Check if user already exists
  const [rows] = await db
    .promise()
    .query("SELECT dni FROM users WHERE dni = ?", [dni]);
  if (rows.length > 0) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  try {
    await db
      .promise()
      .query(
        "INSERT INTO users (dni, username, password, role) VALUES (?, ?, ?, ?)",
        [dni, username, hashedPassword, role || "user"]
      );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const [rows] = await db
    .promise()
    .query("SELECT * FROM users WHERE username = ?", [username]);
  if (rows.length === 0) {
    return res.status(400).json({ error: "User not found" });
  }

  const user = rows[0];

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ dni: user.dni, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log(token);
  res.json({ message: "Login successful", token });
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// Protected route example
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.dni}!`, role: req.user.role });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
