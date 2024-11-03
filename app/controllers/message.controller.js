const Message = require("../models/message.model"); // Make sure the path is correct

const createMessage = async (req, res) => {
  try {
    const { email, date, description } = req.body;

    if (!email || !date || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = new Message({
      email,
      date,
      description,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({
      status: 200,
      message: "success",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllMessage = async (req, res) => {
  try {
    const messages = await Message.find().select("email date description");
    res.status(200).json({
      status: 200,
      message: "success",
      data: messages,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createMessage, getAllMessage };
