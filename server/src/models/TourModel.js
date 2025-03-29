const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  keyHighlights: [String],
  mainImage: String,
  subImages: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Tour', tourSchema);

