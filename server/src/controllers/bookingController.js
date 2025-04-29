const Booking = require("../models/BookingModel");
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

const getAllBookings = async (req, res) => {
  try {
    const Bookings = await Booking.find();
    return Bookings.length
      ? res.status(200).json({ Bookings })
      : res.status(404).json({ message: "No Bookings found" });
  } catch (err) {
    console.error("Error fetching Bookings:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const addBookings = async (req, res) => {
  try {
    const {  userName, tour, guests, status, specialrequests, keyHighlights } =
      req.body;
    const parsedKeyHighlights = Array.isArray(keyHighlights)
      ? keyHighlights
      : JSON.parse(keyHighlights || "[]");

    const mainImage = req.files?.mainImage?.[0]?.filename || "";
    const subImages = req.files?.subImages
      ? req.files.subImages.map((file) => file.filename)
      : [];

    if (  !userName || !tour || !guests || !status || !specialrequests) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const newBooking = new Booking({
      userName,
      tour,
      guests,
      status,
      specialrequests,
      keyHighlights: parsedKeyHighlights,
      mainImage,
      subImages,
    });
    await newBooking.save();
    return res
      .status(201)
      .json({ message: "Booking added successfully", newBooking });
  } catch (err) {
    console.error("Error adding Booking:", err);
    return res
      .status(500)
      .json({ message: "Error adding Booking", error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const Booking = await Booking.findById(req.params.id);
    return Booking
      ? res.status(200).json({ Booking })
      : res.status(404).json({ message: "Booking not found" });
  } catch (err) {
    console.error("Error fetching Booking:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const updateBookings = async (req, res) => {
  try {
    const {  userName, tour, guests, status, specialrequests, keyHighlights } =
      req.body;

    if (!specialrequests) {
      return res.status(400).json({ message: "'specialrequests' is required" });
    }

    const mainImage =
      req.files?.mainImage?.[0]?.filename || req.body.mainImage;
    const subImages = req.files?.subImages
      ? req.files.subImages.map((file) => file.filename)
      : req.body.subImages;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        userName,
        tour,
        guests,
        status,
        specialrequests,
        keyHighlights,
        mainImage,
        subImages,
      },
      { new: true }
    );

    return updatedBooking
      ? res
          .status(200)
          .json({ message: "Booking updated successfully", updatedBooking })
      : res.status(404).json({ message: "Booking not found" });
  } catch (err) {
    console.error("Error updating Booking:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const deleteBookings = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    return deletedBooking
      ? res.status(200).json({ message: "Booking deleted successfully" })
      : res.status(404).json({ message: "Booking not found" });
  } catch (err) {
    console.error("Error deleting Booking:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      userId: req.user._id // Assuming you have user authentication middleware
    });

    await booking.save();
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// Get all bookings for a user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Get a single booking
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = req.body.status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message
    });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message
    });
  }
};

module.exports = {
  upload,
  getAllBookings,
  addBookings,
  getById,
  updateBookings,
  deleteBookings,
  createBooking,
  getUserBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking,
};
