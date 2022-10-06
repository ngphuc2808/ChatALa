const mongoose = require("mongoose");
const { COLLECTION_MESSAGES } = require("../config/db");

const messageModel = mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Rooms" },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    msg: { type: String, trim: true },
    unSend: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messageModel, COLLECTION_MESSAGES);

module.exports = Messages;
