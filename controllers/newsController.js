const News = require("../models/News");
const Match = require("../models/Match");
const Tour = require("../models/Tour");

exports.createNews = async (req, res, next) => {
  try {
    const { title, description, matchId, tourId } = req.body;

    // basic validation
    if (!title || !description) {
      return res.status(400).json({ error: "title and description are required" });
    }

    if (!matchId && !tourId) {
      return res.status(400).json({ error: "Either matchId or tourId must be provided" });
    }

    let sportId = null;
    let finalTourId = tourId || null;

    if (matchId) {
      const match = await Match.findById(matchId).select("tourId").lean();
      if (!match) return res.status(404).json({ error: "Match not found" });
      finalTourId = match.tourId;

      // fetch tour only to read sportId (single small query)
      const tour = await Tour.findById(finalTourId).select("sportId").lean();
      sportId = tour ? tour.sportId : null;

    } else if (tourId) {
      const tour = await Tour.findById(tourId).select("sportId").lean();
      if (!tour) return res.status(404).json({ error: "Tour not found" });
      sportId = tour.sportId;
    }

    const news = await News.create({ title, description, matchId: matchId || null, tourId: finalTourId || null, sportId: sportId || null });

    res.status(201).json(news);
  } catch (err) {
    next(err);
  }
};

exports.getNewsByMatch = async (req, res, next) => {
  try {
    const news = await News.find({ matchId: req.params.matchId });
    res.json(news);
  } catch (err) {
    next(err);
  }
};

exports.getNewsByTour = async (req, res, next) => {
  try {
    const news = await News.find({ tourId: req.params.tourId });
    res.json(news);
  } catch (err) {
    next(err);
  }
};

exports.getNewsBySport = async (req, res, next) => {
  try {
    const news = await News.find({ sportId: req.params.sportId });
    res.json(news);
  } catch (err) {
    next(err);
  }
};
