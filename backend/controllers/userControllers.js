const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const { generateJWT } = require("../utils/utilFunctions");

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, phone } = req.body;
  const env = process.env;

  if (!name || !password || !phone) {
    if (!name) {
      res.status(env.C_REGISTER_MISSING_NAME).send(env.M_REGISTER_MISSING_NAME);
      throw new Error(env.M_REGISTER_MISSING_NAME);
    } else if (!password) {
      res
        .status(env.C_REGISTER_MISSING_PASSWORD)
        .send(env.M_REGISTER_MISSING_PASSWORD);
      throw new Error(env.M_REGISTER_MISSING_PASSWORD);
    } else {
      res
        .status(env.C_REGISTER_MISSING_PHONE)
        .send(env.M_REGISTER_MISSING_PHONE);
      throw new Error(env.M_REGISTER_MISSING_PHONE);
    }
  }

  const userExists = await Users.findOne({ phone });
  if (userExists) {
    res.status(Number(env.C_REGISTER_PHONE_EXISTED)).send(env.M_REGISTER_PHONE_EXISTED);
    throw new Error(env.M_REGISTER_PHONE_EXISTED);
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
    res.status(500).send("Failed to create new user");
    throw new Error("Failed to create new user");
  }
});

module.exports = { registerUser };
