const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware - Use app.get() for the root route
app.get("/", (req, res) => {
  res.send("It is Working");
});

// ✅ Corrected: mongoose.connect (Removed the extra 'n')
mongoose
  .connect(
    "mongodb+srv://it22251428:IT2025xyz@travelproject.0wtx1.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
