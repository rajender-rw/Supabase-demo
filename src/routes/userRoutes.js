import express from "express";
import supabase from "../config/supabase.js";
import upload from "../config/multer.js";
import { v4 as uuidv4 } from "uuid"; // For unique filenames

const router = express.Router();

// GET request to fetch all users
router.get("/", async (req, res) => {
  // Fetching all users from the database
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// POST request to add a new user
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  // Inserting the new user into the database
  const { data, error } = await supabase.from("users").insert([{ name, email }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "User added", data });
});

// Upload any file (image, video, pdf, etc.)
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const fileExt = req.file.originalname.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const bucket = "uploads"; // Change to any Supabase bucket

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, req.file.buffer, {
      contentType: req.file.mimetype,
    });

  if (error) return res.status(500).json({ error: error.message });

  const { publicURL } = supabase.storage.from(bucket).getPublicUrl(fileName);

  res.json({ message: "File uploaded successfully", url: publicURL });
});

export default router;
