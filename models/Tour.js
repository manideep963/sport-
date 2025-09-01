const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sportId: { type: mongoose.Schema.Types.ObjectId, ref: "Sport", required: true, index: true },
});

// compound index on name + sportId to quickly resolve a tour within a sport
TourSchema.index({ name: 1, sportId: 1 });

module.exports = mongoose.model("Tour", TourSchema);
module.exports = mongoose.model("Tour", TourSchema);
