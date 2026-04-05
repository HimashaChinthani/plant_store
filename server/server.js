const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied: No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// POST /login: Admin Authentication
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM admins WHERE username = ?", [username]);
    if (rows.length === 0) return res.status(401).json({ error: "Invalid username or password" });

    const admin = rows[0];
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: "12h" });
    res.json({ token, username: admin.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// GET /plants: Fetch all plants (Public)
app.get("/plants", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM plants ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});

// GET /plants/:id: Fetch specific plant details (Public)
app.get("/plants/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM plants WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Plant not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch plant details" });
  }
});

// POST /plants: Create a new plant with Image Upload (Protected)
app.post("/plants", authenticateToken, upload.single("image"), async (req, res) => {
  const { name, category, price, description, care_instructions } = req.body;
  
  let image_url = req.body.image_url;
  if (req.file) {
    image_url = `http://localhost:5000/uploads/${req.file.filename}`;
  }

  if (!name || !price) {
    return res.status(400).json({ error: "Name and Price are required" });
  }

  try {
    const query = "INSERT INTO plants (name, category, price, description, care_instructions, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(query, [name, category, price, description, care_instructions, image_url]);
    res.status(201).json({ message: "Plant added successfully", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add plant" });
  }
});

// PUT /plants/:id: Update a plant (Protected)
app.put("/plants/:id", authenticateToken, upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, category, price, description, care_instructions } = req.body;
  let image_url = req.body.image_url;

  if (req.file) {
    image_url = `http://localhost:5000/uploads/${req.file.filename}`;
  }

  try {
    let query = "UPDATE plants SET name = ?, category = ?, price = ?, description = ?, care_instructions = ?";
    let params = [name, category, price, description, care_instructions];

    if (image_url !== undefined) {
      query += ", image_url = ?";
      params.push(image_url);
    }

    query += " WHERE id = ?";
    params.push(id);

    const [result] = await db.query(query, params);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Plant not found" });
    res.json({ message: "Plant updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update plant" });
  }
});

// DELETE /plants/:id: Delete a plant (Protected)
app.delete("/plants/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM plants WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Plant not found" });
    res.json({ message: "Plant deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete plant" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("GreenNest Plants Backend Running with full CRUD and Image Uploads");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});