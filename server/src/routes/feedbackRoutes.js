const express = require('express');
const { 
  getAllFeedback,
  createFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Define the routes for feedback
router.route('/')
  .post(createFeedback)           // Submit feedback (authenticated users)
  .get(getAllFeedback); 

router.route('/:id')
  .get(getFeedbackById)    // Get single feedback (admin)
  .put(updateFeedback)     // Update feedback (admin)
  .delete(deleteFeedback); // Delete feedback (admin)

module.exports = router;