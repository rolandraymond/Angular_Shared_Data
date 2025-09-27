// routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { query } = require("../helpers/DB"); 


const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(255).required(),
  age: Joi.number().integer().min(13).max(120).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(1).max(255).required(),
});

async function findUserByEmail(email) {
  const rows = await query(
    "SELECT id, name, email, password_hash, age, created_at FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  if (!user || !user?.length) {
      res.status(404).send({ error: "user not found" });
    }
}

function auth(req, res, next) {
  let header = "";
  if (req && req.headers && req.headers.authorization) {
    header = req.headers.authorization;
  }

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  try {
    req.user = jwt.verify(parts[1], "secretkeygfsgd");
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

router.get("/", function (_req, res) {
  res.status(200).json({ message: "Welcome to the API" });
});

router.post("/auth/register", async function (req, res) {
  const validation = registerSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ error: validation.error.details[0].message });
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const age = req.body.age;

  try {
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await query(
      "INSERT INTO users (name, email, password_hash, age) VALUES (?, ?, ?, ?)",
       [name, email, passwordHash, age]
    );

    const responseUser = {
      id: result && result.insertId ? result.insertId : null,
      name: name,
      email: email,
      age: age,
    };

    return res.status(201).json({ user: responseUser });
  } catch (e) {
    console.error("Register error:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/auth/login", async function (req, res) {
  const validation = loginSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ error: validation.error.details[0].message });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secretkeygfsgd", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token: token });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/profile", auth, async function (req, res) {
  try {
    const userId = req.user && req.user.id ? req.user.id : null;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const rows = await query(
      "SELECT id, name, email, age, created_at FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ profile: rows[0] });
  } catch (e) {
    console.error("Profile error:", e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
