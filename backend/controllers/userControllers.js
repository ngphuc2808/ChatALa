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
    avatar: newUser.avatar,
    banner: newUser.banner,
    name: newUser.name,
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;

  const user = await Users.findOne({ phone });

  if(user) {
    if (await user.matchPassword(password)) {
      res.cookie('token', generateJWT(user._id), {
        signed: true
      });
      res.status(200).json({
        avatar: user.avatar,
        banner: user.banner,
        name: user.name,
      });
    } else {
      return next(new ErrorHandler("Phone Number not found or Incorrect Password", 404));
    }
  } else {
    return next(new ErrorHandler("Phone Number not found", 404));
  }
});



const findUser = asyncHandler(async (req, res, next) => {

  const { phone, name } = req.body;

  const users = await Users.find({
    phone: {
      $regex: new RegExp(phone),
    },
    name: {
      $regex: new RegExp(name),
    },
  })
  .limit(10)
  .sort({phone : -1})

  res.status(200).json({
    users,
  });

});

module.exports = { registerUser, loginUser, findUser };
