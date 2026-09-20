const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");
const observationRoutes = require("./routes/observations");

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check.
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "SkyLog API is running.",
  });
});

// Verify the database connection.
app.get("/health/db", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "ok",
      message: "Database connection successful.",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(500).json({
      status: "error",
      message: "Database connection failed.",
    });
  }
});

// Observation API routes.
app.use("/api/observations", observationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SkyLog API running on http://localhost:${PORT}`);
});