const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: null,
      require: true,
    },
    date: {
      type: Date,
      default: null,
      require: true,
    },
    description: {
      type: String,
      default: null,
      require: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
