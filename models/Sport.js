const mongoose = require("mongoose");

const SportSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

// ensure an index on name for fast lookups by sport name
SportSchema.index({ name: 1 });

module.exports = mongoose.model("Sport", SportSchema);