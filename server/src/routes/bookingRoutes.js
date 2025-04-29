const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected and require authentication
router.use(protect);

// Create a new booking
router.post('/', createBooking);

// Get all bookings for the current user
router.get('/user', getUserBookings);

// Get a single booking
router.get('/:id', getBooking);

// Update booking status (admin only)
router.patch('/:id/status', updateBookingStatus);

// Delete a booking
router.delete('/:id', deleteBooking);

module.exports = router; 