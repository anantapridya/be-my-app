const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

// Route to get all user sessions
router.get("/session", userController.getAllUserSessions);
router.get("/user", userController.getAllUser);

module.exports = router;
