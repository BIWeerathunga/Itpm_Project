import express from 'express';

const router = express.Router();

// Test route to check server functionality
router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

// Test route to check database connection
router.get('/db-check', async (req, res) => {
  try {
    // Example database query
    const result = await SomeModel.find(); // Replace SomeModel with an actual model
    res.status(200).json({ message: 'Database connection successful!', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed!', error: error.message });
  }
});

export default router;