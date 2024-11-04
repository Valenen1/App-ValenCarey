const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Database connection
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

const router = express.Router();

// Register endpoint
router.post("/register", async (req, res) => {
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
router.post("/login", async (req, res) => {
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
  res.json({ message: "Login successful", token });
});

module.exports = router;
