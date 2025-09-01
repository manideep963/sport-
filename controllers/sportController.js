
const Tour = require("../models/Tour");
const News = require("../models/News");


exports.createTour = async (req, res) => {
  try {
    const tour = new Tour(req.body); 
    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.createNews = async (req, res) => {
  try {
    const news = new News(req.body); 
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getMatchesForTour = async (req, res) => {
  try {
    const { tourId } = req.query;
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json(tour.matches || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
