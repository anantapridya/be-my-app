const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    loginTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    logoutTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "logged_out"],
      default: "active",
    },
  },
  { timestamps: true }
);

const UserSession = mongoose.model("UserSession", userSessionSchema);

module.exports = UserSession;
