const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  tour: {
    type: String
  },
  guests: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true
  },
  specialrequests: {
    type: String
  },
  keyHighlights: [String],
  mainImage: String,
  subImages: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);


