const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const destinationRoutes = require("./routes/destinationRoute");
const Router = require("./routes/adminLoginRoute");
const feedbackRouter = require("./routes/feedbackRoutes"); 
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/destinations", destinationRoutes);
app.use("/api/admin", Router);
app.use("/api/feedbacks", feedbackRouter); 

mongoose
  .connect(
    "mongodb+srv://it22251428:IT2025xyz@travelproject.0wtx1.mongodb.net/YOUR_DB_NAME",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
