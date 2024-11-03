const express = require("express");
const messageController = require("../controllers/message.controller");
const router = express.Router();

router.post("/add", messageController.createMessage);
router.get("/", messageController.getAllMessage);

module.exports = router;
