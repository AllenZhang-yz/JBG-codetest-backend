const express = require("express");
const router = express.Router();
const earthquakeRoute = require("./routes/earthquake");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const authGuard = require("./middleware/authGuard");

router.use("/earthquake", authGuard, earthquakeRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);

module.exports = router;
