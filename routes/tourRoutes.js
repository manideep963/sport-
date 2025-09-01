const express = require("express");
const { getMatchesByTour } = require("../controllers/tourController");

const router = express.Router();

// GET /tour/matches?tourName=IPL&limit=20&cursor=2025-08-28T00:00:00Z
// Router is mounted at /tour in server.js, so expose path as /matches here.
router.get("/matches", getMatchesByTour);

module.exports = router;
