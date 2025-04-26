// routes/reportRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');


const router = express.Router();

router.route('/feedback')
  .get(protect, admin, generateFeedbackReport);



module.exports = router;