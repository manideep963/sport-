const express = require("express");
const router = express.Router();
const sportController = require("../controllers/sportController");

// GET matches for a tour
router.get("/tour/match", sportController.getMatchesForTour);

// POST create a new tour
router.post("/tour", sportController.createTour);

// POST create a news item
router.post("/news", sportController.createNews);

module.exports = router;
