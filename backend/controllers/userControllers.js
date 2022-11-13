const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const { generateJWT } = require("../utils/utilFunctions");
const ErrorHandler = require("../utils/errorHandler");
const Friends = require("../models/friendModel");
const { decodeJWT } = require("../utils/utilFunctions");

const checkUser = asyncHandler(async (req, res, next) => {
  const phone = req.query.phone;

  const user = await Users.findOne({ phone: phone });

  if(!user) {
    res.status(200).json({
      message: "Valid phone number!"
    });
  } else {
    return next(
      new ErrorHandler("Phone number already exists!", 404)
    );
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, phone } = req.body;

  const newUser = await Users.create({
    name,
    phone,
    password,
  });

  res.status(200).json({
    message: "Register Successfully!",
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;

  const user = await Users.findOne({ phone });

  if (user) {
    if (await user.matchPassword(password)) {
      res.cookie("token", generateJWT(user._id), {
        signed: true,
        httpOnly: true,
        // secure: true,
      });
      res.status(200).json({
        avatar: user.avatar,
        banner: user.banner,
        name: user.name
      });
    } else {
      return next(
        new ErrorHandler("Phone Number not found or Incorrect Password", 404)
      );
    }
  } else {
    return next(
      new ErrorHandler("Phone Number not found or Incorrect Password", 404)
    );
  }
});

const findUser = asyncHandler(async (req, res, next) => {
  const { search } = req.body;
  const { id } = decodeJWT(req.signedCookies.token);

  const myFriends = await Friends.find({
    $or: [
      {
        uid1: id,
      },
      {
        uid2: id,
      },
    ],
  });

  let listFriendId = [];
  myFriends.forEach((it) => {
    if (it.uid1.toString() === id) {
      listFriendId.push(it.uid2.toString());
    } else {
      listFriendId.push(it.uid1.toString());
    }
  });

  const searchUsers = await Users.find({
    $or: [
      {
        phone: {
          $regex: search,
        },
      },
      {
        name: {
          $regex: search,
        },
      },
    ],
  }).limit(10);

  let result = [];
  searchUsers.forEach((it) => {
    let t = false;
    listFriendId.forEach((childIt) => {
      if (it.id === childIt) {
        t = true;
      }
    });
    result.push({ ...it.toObject(), isFriend: t });
  });
  console.log(result);

  res.status(200).json({
    result,
  });
});

module.exports = { checkUser, registerUser, loginUser, findUser };
