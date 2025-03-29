const express = require("express");
const router = express.Router();
const {
  upload,
  getAllTours,
  addTours,
  getById,
  updateTours,
  deleteTours,
} = require("../controllers/tourController");

router.get("/", getAllTours);
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 10 },
  ]),
  addTours
);

router.get("/:id", getById);
router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 10 },
  ]),
  updateTours
);
router.delete("/:id", deleteTours);

module.exports = router;