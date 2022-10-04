const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    avatar: {
      type: String,
      require: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    banner: {
      type: String,
      require: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    name: { type: String, require: true, trim: true },
    password: { type: String, require: true },
    phone: { type: String, require: true, trim: true },
    gender: { type: String, require: true },
    dob: { type: Date, require: true },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userModel);

module.exports = Users;
