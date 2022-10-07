const mongoose = require("mongoose");
const { COLLECTION_USERS } = require("../config/db");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    avatar: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    banner: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    name: { type: String, require: true, trim: true },
    password: { type: String, require: true },
    phone: { type: String, require: true, trim: true, unique: true },
    gender: { type: String, default: "male" },
    dob: { type: Date, default: new Date() },
  },
  { timestamps: true },
  { collection: "Users" }
);

userModel.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified) next();

  this.password = await bcrypt.hashSync(this.password);
});

const Users = mongoose.model("Users", userModel, COLLECTION_USERS);

module.exports = Users;
