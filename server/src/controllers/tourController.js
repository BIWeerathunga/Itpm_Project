const Tour = require("../models/TourModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    return tours.length
      ? res.status(200).json({ tours })
      : res.status(404).json({ message: "No tours found" });
  } catch (err) {
    console.error("Error fetching tours:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const addTours = async (req, res) => {
  try {
    const { title, description, price, location, duration, keyHighlights } =
      req.body;
    const parsedKeyHighlights = Array.isArray(keyHighlights)
      ? keyHighlights
      : JSON.parse(keyHighlights || "[]");

    const mainImage = req.files?.mainImage?.[0]?.filename || "";
    const subImages = req.files?.subImages
      ? req.files.subImages.map((file) => file.filename)
      : [];

    if (!title || !description || !price || !location || !duration) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const newTour = new Tour({
      title,
      description,
      price,
      location,
      duration,
      keyHighlights: parsedKeyHighlights,
      mainImage,
      subImages,
    });
    await newTour.save();
    return res
      .status(201)
      .json({ message: "Tour added successfully", newTour });
  } catch (err) {
    console.error("Error adding tour:", err);
    return res
      .status(500)
      .json({ message: "Error adding tour", error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    return tour
      ? res.status(200).json({ tour })
      : res.status(404).json({ message: "Tour not found" });
  } catch (err) {
    console.error("Error fetching tour:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const updateTours = async (req, res) => {
  try {
    const { title, description, price, location, duration, keyHighlights } =
      req.body;

    if (!duration) {
      return res.status(400).json({ message: "'duration' is required" });
    }

    const mainImage =
      req.files?.mainImage?.[0]?.filename || req.body.mainImage;
    const subImages = req.files?.subImages
      ? req.files.subImages.map((file) => file.filename)
      : req.body.subImages;

    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        location,
        duration,
        keyHighlights,
        mainImage,
        subImages,
      },
      { new: true }
    );

    return updatedTour
      ? res
          .status(200)
          .json({ message: "Tour updated successfully", updatedTour })
      : res.status(404).json({ message: "Tour not found" });
  } catch (err) {
    console.error("Error updating tour:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const deleteTours = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    return deletedTour
      ? res.status(200).json({ message: "Tour deleted successfully" })
      : res.status(404).json({ message: "Tour not found" });
  } catch (err) {
    console.error("Error deleting tour:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
  upload,
  getAllTours,
  addTours,
  getById,
  updateTours,
  deleteTours,
};
