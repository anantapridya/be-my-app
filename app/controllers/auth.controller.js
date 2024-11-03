const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UserSession = require("../models/user_session.model");
const SECRET_KEY = "iniadalahscrtkey";

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      passwordHash,
    });
    await newUser.save();

    res.status(201).json({ message: "user successfully registered" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    const newSession = new UserSession({
      userId: user._id,
      loginTime: new Date(),
      status: "active",
    });
    await newSession.save();

    res.status(200).json({
      status: "success",
      message: "login success",
      data: {
        username: user.username,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const { userId } = req.user;

    const activeSession = await UserSession.findOne({
      userId,
      status: "active",
    }).sort({ loginTime: -1 });

    if (!activeSession) {
      return res.status(400).json({ message: "expired token" });
    }

    activeSession.logoutTime = new Date();
    activeSession.status = "logged_out";
    await activeSession.save();

    res.status(200).json({ message: "logout success" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
