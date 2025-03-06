import express from "express";
import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ 1. User Sign-Up (Email & Password)
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "User signed up successfully!", user });
});

// ✅ 2. User Sign-In (Login)
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  // Generate JWT token for session management
  const token = jwt.sign({ user_id: data.user.id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.json({ message: "User signed in successfully!", token, user: data.user });
});

// ✅ 3. Get Authenticated User Info
router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract JWT from Bearer Token

  if (!token) return res.status(401).json({ error: "Unauthorized, token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data: user, error } = await supabase.auth.getUser(decoded.user_id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
