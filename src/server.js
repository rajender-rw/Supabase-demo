import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

// Creating an instance of Express
const app = express();
app.use(cors());
app.use(express.json());

// Setting up routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/upload", userRoutes);

// Setting up a default route
app.get("/", (req, res) => res.send("Supabase is running 🚀"));

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
