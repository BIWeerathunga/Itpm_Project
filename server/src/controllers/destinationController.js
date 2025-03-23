const Destination = require("../models/DestinationModel");

// Get all destinations
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    if (!destinations || destinations.length === 0) {
      return res.status(404).json({ message: "No destinations found" });
    }
    return res.status(200).json({ destinations });
  } catch (err) {
    console.error("Error fetching destinations:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Add a new destination
const addDestinations = async (req, res) => {
  const { destinationName, district, province, category, keyHighlights } =
    req.body;

  try {
    const newDestination = new Destination({
      destinationName,
      district,
      province,
      category,
      keyHighlights,
    });
    await newDestination.save();
    return res
      .status(201)
      .json({ message: "Destination added successfully", newDestination });
  } catch (err) {
    console.error("Error adding destination:", err);
    return res
      .status(500)
      .json({ message: "Unable to add destination", error: err.message });
  }
};

// Get a destination by ID
const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    return res.status(200).json({ destination });
  } catch (err) {
    console.error("Error fetching destination:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Update a destination
const updateDestinations = async (req, res) => {
  const id = req.params.id;
  const { destinationName, district, province, category, keyHighlights } =
    req.body;

  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      { destinationName, district, province, category, keyHighlights },
      { new: true } // Ensures the updated document is returned
    );
    if (!updatedDestination) {
      return res.status(404).json({ message: "Unable to update destination" });
    }
    return res
      .status(200)
      .json({
        message: "Destination updated successfully",
        updatedDestination,
      });
  } catch (err) {
    console.error("Error updating destination:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Delete a destination
const deleteDestinations = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDestination = await Destination.findByIdAndDelete(id);
    if (!deletedDestination) {
      return res.status(404).json({ message: "Unable to delete destination" });
    }
    return res
      .status(200)
      .json({ message: "Destination deleted successfully" });
  } catch (err) {
    console.error("Error deleting destination:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// Corrected Export
module.exports = {
  getAllDestinations,
  addDestinations,
  getById,
  updateDestinations,
  deleteDestinations,
};
