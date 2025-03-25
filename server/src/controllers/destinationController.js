const Destination = require("../models/DestinationModel");
const multer = require("multer");
const path = require("path");

// Ensure uploads directory exists
const fs = require("fs");
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Get all destinations
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    return destinations.length
      ? res.status(200).json({ destinations })
      : res.status(404).json({ message: "No destinations found" });
  } catch (err) {
    console.error("Error fetching destinations:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Add a new destination
const addDestinations = async (req, res) => {
  try {
    const {
      destinationName,
      district,
      province,
      category,
      description,
      keyHighlights,
    } = req.body;

    // Ensure keyHighlights is an array
    const parsedKeyHighlights = Array.isArray(keyHighlights)
      ? keyHighlights
      : JSON.parse(keyHighlights || "[]");

    const mainImage = req.files["mainImage"]?.[0]?.filename || "";
    const subImages = req.files["subImages"]
      ? req.files["subImages"].map((file) => file.filename)
      : [];

    if (
      !destinationName ||
      !district ||
      !province ||
      !category ||
      !description
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const newDestination = new Destination({
      destinationName,
      district,
      province,
      category,
      description,
      keyHighlights: parsedKeyHighlights,
      mainImage,
      subImages,
    });

    await newDestination.save();
    return res
      .status(201)
      .json({ message: "Destination added successfully", newDestination });
  } catch (err) {
    console.error("Error adding destination:", err);
    return res
      .status(500)
      .json({ message: "Error adding destination", error: err.message });
  }
};

// Get a destination by ID
const getById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    return destination
      ? res.status(200).json({ destination })
      : res.status(404).json({ message: "Destination not found" });
  } catch (err) {
    console.error("Error fetching destination:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Update a destination
const updateDestinations = async (req, res) => {
  try {
    const {
      destinationName,
      district,
      province,
      category,
      description,
      keyHighlights,
    } = req.body;

    if (!description) {
      return res.status(400).json({ message: "'description' is required" });
    }

    const mainImage =
      req.files["mainImage"]?.[0]?.filename || req.body.mainImage;
    const subImages = req.files["subImages"]
      ? req.files["subImages"].map((file) => file.filename)
      : req.body.subImages;

    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      {
        destinationName,
        district,
        province,
        category,
        description,
        keyHighlights,
        mainImage,
        subImages,
      },
      { new: true }
    );

    return updatedDestination
      ? res
          .status(200)
          .json({
            message: "Destination updated successfully",
            updatedDestination,
          })
      : res.status(404).json({ message: "Destination not found" });
  } catch (err) {
    console.error("Error updating destination:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Delete a destination
const deleteDestinations = async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(
      req.params.id
    );
    return deletedDestination
      ? res.status(200).json({ message: "Destination deleted successfully" })
      : res.status(404).json({ message: "Destination not found" });
  } catch (err) {
    console.error("Error deleting destination:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
  upload,
  getAllDestinations,
  addDestinations,
  getById,
  updateDestinations,
  deleteDestinations,
};
