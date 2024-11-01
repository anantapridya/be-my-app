const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authenticateToken, authController.logout);

module.exports = router;
