const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email"
    ]
  },
  feedback: {
    type: String,
    required: [true, "Please provide your feedback message"],
    trim: true
  },
  avatar: {
    type: String,
    default: "https://example.com/default-avatar.png", 
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"]
  },
  destination: {
    type: String,
    required: false,
    trim: true
  },
  location: {
    type: String,
    default: "no location",
  },
  date: {
    type: Date,
    default: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Feedback", feedbackSchema);