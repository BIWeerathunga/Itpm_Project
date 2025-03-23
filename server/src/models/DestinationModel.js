const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  destinationName: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  keyHighlights: {
    type: [String], // ✅ Changed to an array of strings
    required: true,
  },
});

module.exports = mongoose.model("Destination", destinationSchema); // ✅ Fixed model name
