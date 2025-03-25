const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/destinationRoute");
const adminLoginRouter = require("./routes/adminLoginRoute");

const app = express();
const cors = require("cors");

// Middleware - Use app.get() for the root route
app.use(express.json());
app.use(cors());
app.use("/api/destinations", router);
app.use("/api", adminLoginRouter);

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
