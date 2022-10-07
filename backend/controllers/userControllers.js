const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const { generateJWT } = require("../utils/utilFunctions");
const GV = require("../utils/GlobalVariables");

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, phone } = req.body;

  if (!name || !password || !phone) {
    if (!name) {
      res.status(GV.C_REGISTER_MISSING_NAME).send(GV.M_REGISTER_MISSING_NAME);
      throw new Error(GV.M_REGISTER_MISSING_NAME);
    } else if (!password) {
      res
        .status(GV.C_REGISTER_MISSING_PASSWORD)
        .send(GV.M_REGISTER_MISSING_PASSWORD);
      throw new Error(GV.M_REGISTER_MISSING_PASSWORD);
    } else {
      res.status(GV.C_REGISTER_MISSING_PHONE).send(GV.M_REGISTER_MISSING_PHONE);
      throw new Error(GV.M_REGISTER_MISSING_PHONE);
    }
  }

  const userExists = await Users.findOne({ phone });
  if (userExists) {
    res
      .status(Number(GV.C_REGISTER_PHONE_EXISTED))
      .send(GV.M_REGISTER_PHONE_EXISTED);
    throw new Error(GV.M_REGISTER_PHONE_EXISTED);
  }

  const newUser = await Users.create({
    name,
    phone,
    password,
  });

  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      phone: newUser.phone,
      avatar: newUser.avatar,
      jwt: generateJWT(newUser._id),
    });
  } else {
    res.status(GV.C_REGISTER_FAILED).send(GV.M_REGISTER_FAILED);
    throw new Error(GV.M_REGISTER_FAILED);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const user = await Users.findOne({ phone });

  if (user) {
    if (user.matchPassword(password)) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
        jwt: generateJWT(user._id),
      });
    } else {
      res.status(GV.C_LOGIN_WRONGPASSWORD).send(GV.M_LOGIN_WRONGPASSWORD);
      throw new Error(GV.M_LOGIN_WRONGPASSWORD);
    }
  } else {
    res.status(GV.C_LOGIN_NOTFOUND).send(GV.M_LOGIN_NOTFOUND);
    throw new Error(GV.M_LOGIN_NOTFOUND);
  }
});

module.exports = { registerUser, loginUser };
