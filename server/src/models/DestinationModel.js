const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  destinationName: { type: String, required: true },
  district: { type: String, required: true },
  province: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  keyHighlights: { type: [String], default: [] }, // Ensure array type
  mainImage: { type: String },
  subImages: { type: [String], default: [] },
});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
