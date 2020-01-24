const express = require("express");

const {
  addEarthquake,
  getEarthquake,
  getTopTenEarthquakes,
  updateEarthquake
} = require("../controllers/earthquake");

const router = express.Router();

router.get("/", getTopTenEarthquakes);
router.get("/:id", getEarthquake);
router.post("/", addEarthquake);
router.put("/:id", updateEarthquake);

module.exports = router;
