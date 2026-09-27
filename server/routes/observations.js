const express = require("express");
const router = express.Router();

const pool = require("../db");

// GET /api/observations
// Retrieve all observations.
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM observations
       ORDER BY date_observed DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving observations:", error);

    res.status(500).json({
      error: "Failed to retrieve observations.",
    });
  }
});

// GET /api/observations/:id
// Retrieve one observation.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || Number(id) < 1) {
      return res.status(400).json({
        error: "Invalid observation ID.",
      });
    }

    const result = await pool.query(
      "SELECT * FROM observations WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Observation not found.",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving observation:", error);

    res.status(500).json({
      error: "Failed to retrieve observation.",
    });
  }
});

// POST /api/observations
// Create a new observation.
router.post("/", async (req, res) => {
  try {
    const {
      object_name,
      object_type,
      date_observed,
      location,
      equipment,
      sky_conditions,
      notes,
      rating,
    } = req.body;

    if (
      typeof object_name !== "string" ||
      !object_name.trim() ||
      typeof object_type !== "string" ||
      !object_type.trim() ||
      !date_observed ||
      Number.isNaN(Date.parse(date_observed))
    ) {
      return res.status(400).json({
        error:
          "Object name, object type, and a valid observation date are required.",
      });
    }

    if (
      rating !== undefined &&
      rating !== null &&
      (!Number.isInteger(Number(rating)) ||
        Number(rating) < 1 ||
        Number(rating) > 5)
    ) {
      return res.status(400).json({
        error: "Rating must be a number between 1 and 5.",
      });
    }

    const result = await pool.query(
      `INSERT INTO observations (
        object_name,
        object_type,
        date_observed,
        location,
        equipment,
        sky_conditions,
        notes,
        rating
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        object_name.trim(),
        object_type.trim(),
        date_observed,
        location || null,
        equipment || null,
        sky_conditions || null,
        notes || null,
        rating === undefined || rating === null || rating === ""
          ? null
          : Number(rating),
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating observation:", error);

    res.status(500).json({
      error: "Failed to create observation.",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    object_name,
    object_type,
    date_observed,
    location,
    equipment,
    sky_conditions,
    notes,
    rating,
  } = req.body;

  // Validate ID
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      error: "Invalid observation ID.",
    });
  }

  // Validate required fields
  if (!object_name || !object_type || !date_observed) {
    return res.status(400).json({
      error: "Object name, object type, and observation date are required.",
    });
  }

  // Validate rating
  if (
    rating !== null &&
    rating !== undefined &&
    (Number(rating) < 1 || Number(rating) > 5)
  ) {
    return res.status(400).json({
      error: "Rating must be between 1 and 5.",
    });
  }

  try {
    const result = await pool.query(
      `
      UPDATE observations
      SET
        object_name = $1,
        object_type = $2,
        date_observed = $3,
        location = $4,
        equipment = $5,
        sky_conditions = $6,
        notes = $7,
        rating = $8
      WHERE id = $9
      RETURNING *
      `,
      [
        object_name,
        object_type,
        date_observed,
        location || null,
        equipment || null,
        sky_conditions || null,
        notes || null,
        rating || null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Observation not found.",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating observation:", error);

    res.status(500).json({
      error: "Failed to update observation.",
    });
  }
});
// DELETE /api/observations/:id
// Delete an observation.
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id) || Number(id) < 1) {
      return res.status(400).json({
        error: "Invalid observation ID.",
      });
    }

    const result = await pool.query(
      "DELETE FROM observations WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Observation not found.",
      });
    }

    res.json({
      message: "Observation deleted successfully.",
      observation: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting observation:", error);

    res.status(500).json({
      error: "Failed to delete observation.",
    });
  }
});

module.exports = router;