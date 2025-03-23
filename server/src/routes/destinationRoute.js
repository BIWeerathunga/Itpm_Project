const express = require("express");
const router = express.Router();
//Insert Model
const Destination = require("../models/DestinationModel");
//Insert Controller
const DestinationController = require("../controllers/destinationController");

router.get("/", DestinationController.getAllDestinations);
router.post("/", DestinationController.addDestinations);
router.get("/:id", DestinationController.getById);
router.put("/:id", DestinationController.updateDestinations);
router.delete("/:id", DestinationController.deleteDestinations);
//export
module.exports = router;
