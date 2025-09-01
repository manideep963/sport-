const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: "Match", default: null },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", default: null },
    sportId: { type: mongoose.Schema.Types.ObjectId, ref: "Sport", default: null },
  },
  { timestamps: true }
);

// indexes to support queries by match, tour, and sport quickly
NewsSchema.index({ matchId: 1 });
NewsSchema.index({ tourId: 1 });
NewsSchema.index({ sportId: 1 });

module.exports = mongoose.model("News", NewsSchema);
