const Sport = require("../models/Sport");
const Tour = require("../models/Tour");
const Match = require("../models/Match");

exports.getMatchDetails = async (req, res, next) => {
  try {
    const { sportName, tourName } = req.query;
    if (!sportName || !tourName) {
      return res.status(400).json({ error: "sportName and tourName are required" });
    }

    // Step 1: Resolve sport
    const sport = await Sport.findOne({ name: sportName }).select("_id").lean();
    if (!sport) return res.status(404).json({ error: "Sport not found" });

    // Step 2: Resolve tour within sport
    const tour = await Tour.findOne({ name: tourName, sportId: sport._id }).select("_id").lean();
    if (!tour) return res.status(404).json({ error: "Tour not found for sport" });

    // Step 3: Fetch matches (indexed on tourId)
    const matches = await Match.find({ tourId: tour._id })
      .select("_id startTime format status") // only fetch needed fields
      .lean();

    // Step 4: Shape response
    const response = matches.map(m => ({
      id: m._id.toString(),
      startTime: m.startTime,
      format: m.format,
      status: m.status
    }));

    res.json({ sport: sportName, tour: tourName, matches: response });
  } catch (err) {
    next(err);
  }
};
