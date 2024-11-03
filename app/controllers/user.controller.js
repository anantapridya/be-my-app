const UserSession = require("../models/user_session.model");
const User = require("../models/user.model");

// Controller to get all user sessions
const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("username email createdAt");
    res.status(200).json({
      status: 200,
      message: "success",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllUserSessions = async (req, res) => {
  try {
    const sessions = await UserSession.find().populate(
      "userId",
      "username email"
    );
    res.status(200).json({
      status: 200,
      message: "success",
      data: sessions,
    });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllUserSessions, getAllUser };
