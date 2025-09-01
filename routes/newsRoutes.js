const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// POST /news
router.post("/", newsController.createNews);

// GET /news/match/:matchId
router.get("/match/:matchId", newsController.getNewsByMatch);

// GET /news/tour/:tourId
router.get("/tour/:tourId", newsController.getNewsByTour);

// GET /news/sport/:sportId
router.get("/sport/:sportId", newsController.getNewsBySport);

module.exports = router;
