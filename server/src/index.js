const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bookingRoutes = require("./routes/bookingRoutes");
const tourRoutes = require("./routes/tourRoute");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Test route to verify API is working
app.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/tours", tourRoutes);

// MongoDB Connection with async sample tour creation
mongoose
  .connect("mongodb+srv://it22251428:IT2025xyz@travelproject.0wtx1.mongodb.net/travel_db")
  .then(async () => {
    console.log("Connected to MongoDB");
    
    try {
      // Check if we have any tours, if not create a sample tour
      const Tour = require('./models/TourModel');
      const tours = await Tour.find();
      if (tours.length === 0) {
        const sampleTour = new Tour({
          title: "Kandy City Tour",
          description: "Explore the historic city of Kandy",
          price: 75,
          location: "Kandy, Sri Lanka",
          duration: "1 day",
          keyHighlights: ["Temple of the Tooth", "Kandy Lake"]
        });
        await sampleTour.save();
        console.log("Sample tour created successfully");
      }

      // Fix tours with missing or invalid mainImage (including non-existent files)
      const uploadsPath = path.join(__dirname, '../uploads');
      const imageFiles = fs.readdirSync(uploadsPath).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
      if (imageFiles.length > 0) {
        const tours = await Tour.find();
        for (const tour of tours) {
          if (!tour.mainImage || !imageFiles.includes(tour.mainImage)) {
            // Assign a random image from uploads
            tour.mainImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
            await tour.save();
            console.log(`Updated tour ${tour.title} with image ${tour.mainImage}`);
          }
        }
      } else {
        console.log('No images found in uploads folder to assign to tours.');
      }

      // Dynamic port allocation function
      const startServer = (port) => {
        app.listen(port)
          .on('listening', () => {
            console.log(`Server running on port ${port}`);
            console.log(`Test API at: http://localhost:${port}/test`);
            console.log(`Tours API at: http://localhost:${port}/api/tours`);
          })
          .on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
              console.log(`Port ${port} is busy, trying ${port + 1}`);
              startServer(port + 1);
            } else {
              console.error('Server error:', err);
            }
          });
      };

      // Start server with initial port
      startServer(5000);
    } catch (err) {
      console.error("Error during server startup:", err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    console.error("Please check your MongoDB connection string and ensure MongoDB Atlas is accessible");
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message
  });
});
