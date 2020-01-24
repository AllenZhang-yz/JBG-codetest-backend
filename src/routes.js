const express = require("express");
const router = express.Router();
const earthquakeRoute = require("./routes/earthquake");

router.use("/earthquake", earthquakeRoute);

module.exports = router;
