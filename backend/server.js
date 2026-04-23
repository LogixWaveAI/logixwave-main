const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const compression = require("compression");
const https = require("https");
const http = require("http");

// --- IMPORTANT: Load Env Vars FIRST ---
dotenv.config();

// Route Imports
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const contactRoutes = require("./routes/contactRoutes");
const memberRoutes = require("./routes/memberRoutes");

// Database Connection
connectDB();

const app = express();

// Middleware
app.use(compression());
app.use(express.json());
app.use(cors());

// Isse browser uploaded images ko access kar payega, with caching enabled
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), { maxAge: "30d" }),
);

// --- MOUNT ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/members", memberRoutes);

app.get("/", (req, res) => {
  res.send("KPCODETECH API is Running... 🚀");
});

app.get("/ping", (req, res) => {
  res.status(200).json({ status: "alive", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // --- KEEP-ALIVE: Prevent Render free tier from sleeping ---
  // Pings itself every 14 minutes (Render sleeps after 15 min of inactivity)
  const RENDER_URL = process.env.RENDER_URL || "https://logixwave-main-1.onrender.com";
  
  setInterval(() => {
    const url = new URL(`${RENDER_URL}/ping`);
    const requester = url.protocol === "https:" ? https : http;
    
    requester.get(url.href, (res) => {
      console.log(`[Keep-Alive] Pinged ${url.href} — Status: ${res.statusCode}`);
    }).on("error", (err) => {
      console.error(`[Keep-Alive] Ping failed:`, err.message);
    });
  }, 14 * 60 * 1000); // Every 14 minutes
});
