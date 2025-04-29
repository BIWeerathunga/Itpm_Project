const Feedback = require('../models/feedbackModel');

// Get all feedback entries
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No feedback entries found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      count: feedbacks.length,
      data: feedbacks 
    });

  } catch (err) {
    console.error("Error fetching feedback:", err);
    return res.status(500).json({ 
      success: false,
      message: "Server Error",
      error: err.message 
    });
  }
};

// Create new feedback
const createFeedback = async (req, res) => {
  try {
    const { name, email, feedback, rating, destination, location, avatar } = req.body;
    
    // Basic validation
    if (!name || !email || !feedback || !rating || !destination || !location || !avatar) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, message, and rating"
      });
    }

    const newFeedback = new Feedback({
      name,
      email,
      avatar,
      feedback,
      rating: Math.min(5, Math.max(1, rating)), // Ensure rating is between 1-5
      destination,
      location,
      date: Date()
    });

    await newFeedback.save();
    
    return res.status(201).json({ 
      success: true,
      message: "Feedback submitted successfully",
      data: newFeedback 
    });

  } catch (err) {
    console.error("Error creating feedback:", err);
    return res.status(500).json({ 
      success: false,
      message: "Failed to submit feedback",
      error: err.message 
    });
  }
};

// Get single feedback entry
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ 
        success: false,
        message: "Feedback not found" 
      });
    }
    
    return res.status(200).json({ 
      success: true,
      data: feedback 
    });

  } catch (err) {
    console.error("Error fetching feedback:", err);
    return res.status(500).json({ 
      success: false,
      message: "Server Error",
      error: err.message 
    });
  }
};

// Update feedback
const updateFeedback = async (req, res) => {
  try {
    const { name, email, feedback, rating, destination, location } = req.body;
    
    const updateFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { 
        name, email, feedback, rating, destination, location,
        updatedAt: Date() 
      },
      { new: true, runValidators: true }
    );

    if (!updateFeedback) {
      return res.status(404).json({ 
        success: false,
        message: "Feedback not found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: "Feedback updated successfully",
      data: feedback 
    });

  } catch (err) {
    console.error("Error updating feedback:", err);
    return res.status(500).json({ 
      success: false,
      message: "Failed to update feedback",
      error: err.message 
    });
  }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ 
        success: false,
        message: "Feedback not found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: "Feedback deleted successfully"
    });

  } catch (err) {
    console.error("Error deleting feedback:", err);
    return res.status(500).json({ 
      success: false,
      message: "Failed to delete feedback",
      error: err.message 
    });
  }
};

module.exports = {
  getAllFeedback,
  createFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
};