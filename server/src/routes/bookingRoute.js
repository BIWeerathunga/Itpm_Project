const express = require("express");
const router = express.Router();
const {
  upload,
  getAllBookings,
  addBookings,
  getById,
  updateBookings,
  deleteBookings,
} = require("../controllers/bookingController");

router.get("/", getAllBookings);
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 10 },
  ]),
  addBookings
);
router.get("/:id", getById);
router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 10 },
  ]),
  updateBookings
);
router.delete("/:id", deleteBookings);

module.exports = router;