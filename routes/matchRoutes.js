const express = require("express");
const { getMatchDetails } = require("../controllers/matchController");

const router = express.Router();

// GET /sport/tour/match?sportName=Cricket&tourName=IPL
router.get("/sport/tour/match", getMatchDetails);

module.exports = router;
