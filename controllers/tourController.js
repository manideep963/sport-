const Tour = require("../models/Tour");
const Match = require("../models/Match");

exports.getMatchesByTour = async (req, res, next) => {
  try {
    const { tourName, limit = 50, cursor } = req.query;

    if (!tourName) {
      return res.status(400).json({ error: "tourName is required" });
    }

    // Step 1: Find tour by name (fast since indexed on sportId+name, or name)
    const tour = await Tour.findOne({ name: tourName }).select("_id").lean();
    if (!tour) return res.status(404).json({ error: "Tour not found" });

    // Step 2: Build match filter
    const filter = { tourId: tour._id };
    if (cursor) {
      // cursor = ISODate string for pagination
      filter.startTime = { $gt: new Date(cursor) };
    }

    // Step 3: Fetch matches (indexed on tourId)
    const matches = await Match.find(filter)
      .select("_id startTime format status") // only necessary fields
      .sort({ startTime: 1 }) // chronological order
      .limit(Math.min(Number(limit), 200)) // cap to prevent overload
      .lean();

    // Step 4: Shape response
    const response = matches.map(m => ({
      id: m._id.toString(),
      startTime: m.startTime,
      format: m.format,
      status: m.status,
    }));

    res.json({
      tour: tourName,
      count: response.length,
      matches: response,
      nextCursor: response.length ? response[response.length - 1].startTime : null,
    });
  } catch (err) {
    next(err);
  }
};

