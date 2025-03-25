const express = require("express");
const router = express.Router();
const {
  upload,
  getAllDestinations,
  addDestinations,
  getById,
  updateDestinations,
  deleteDestinations,
} = require("../controllers/destinationController");

router.get("/", getAllDestinations);
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 10 },
  ]),
  addDestinations
);
router.get("/:id", getById);
router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 10 },
  ]),
  updateDestinations
);
router.delete("/:id", deleteDestinations);

module.exports = router;
