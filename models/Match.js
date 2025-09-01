const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", index: true },
    startTime: { type: Date },
    format: { type: String }, // e.g. T20, ODI, Test
    status: { type: String }, // upcoming, live, completed
  },
  { timestamps: true }
);


// compound index to support queries like: find matches for a tour ordered/filtered by startTime
MatchSchema.index({ tourId: 1, startTime: 1 });

module.exports = mongoose.model("Match", MatchSchema);
