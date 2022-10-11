const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const { generateJWT } = require("../utils/utilFunctions");
const ErrorHandler = require("../utils/errorHandler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, phone } = req.body;

  const newUser = await Users.create({
    name,
    phone,
    password,
  });

  res.status(200).json({
    newUser,
    jwt: generateJWT(newUser._id),
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;

  const user = await Users.findOne({ phone });

  if (user.matchPassword(password)) {
    res.status(200).json({
      user,
      jwt: generateJWT(user._id),
    });
  } else {
    return next(new ErrorHandler("Phone Number not found or Incorrect Password", 404));
  }
});

module.exports = { registerUser, loginUser };
