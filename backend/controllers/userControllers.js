const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const { generateJWT } = require('../utils/utilFunctions');
const ErrorHandler = require('../utils/errorHandler');
const Friends = require('../models/friendModel');
const { decodeJWT } = require('../utils/utilFunctions');
const Notifications = require('../models/notificationModel');

const checkUser = asyncHandler(async (req, res, next) => {
  const phone = req.query.phone;

  const user = await Users.findOne({ phone: phone });

  if (!user) {
    res.status(200).json({
      message: 'Valid phone number!',
    });
  } else {
    return next(new ErrorHandler('Phone number already exists!', 404));
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, phone } = req.body;

  const regexPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (phone.match(regexPhone) && password.match(regexPassword)) {
    await Users.create({
      name: name.replace(/\s+/g, ' ').trim(),
      phone,
      password,
    });

    res.status(200).json({
      message: 'Register Successfully!',
    });
  } else {
    return next(new ErrorHandler('Register failed!', 404));
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;

  const user = await Users.findOne({ phone });

  if (user) {
    if (await user.matchPassword(password)) {
      res.cookie('token', generateJWT(user._id), {
        signed: true,
        httpOnly: true,
        // secure: true,
      });
      res.status(200).json({
        message: 'Login successfully',
      });
    } else {
      return next(
        new ErrorHandler('Phone Number not found or Incorrect Password', 404)
      );
    }
  } else {
    return next(
      new ErrorHandler('Phone Number not found or Incorrect Password', 404)
    );
  }
});

const getLoggedUser = asyncHandler(async (req, res, next) => {
  res.status(200).json(req.user);
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successfully' });
});

const findUser = asyncHandler(async (req, res, next) => {
  const { search } = req.body;
  const id = req.user._id;

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
  let listRelatedId = [];
  myFriends.forEach((it) => {
    if (it.uid1.toString() === id.toString()) {
      listRelatedId.push({ id: it.uid2.toString(), status: it.status.type });
    } else {
      listRelatedId.push({ id: it.uid1.toString(), status: it.status.type });
    }
  });

  const pendingId = await Notifications.find({
    $or: [
      {
        receiveId: id,
      },
      {
        requestId: id,
      },
    ],
    status: 'Pending',
  });

  pendingId.forEach((it) => {
    if (it.receiveId.toString() === id.toString()) {
      listRelatedId.push({
        id: it.requestId.toString(),
        status: 'receive',
        notificationId: it.id,
      });
    } else {
      listRelatedId.push({
        id: it.receiveId.toString(),
        status: 'request',
        notificationId: it.id,
      });
    }
  });

  const searchUsers = await Users.find({
    $or: [
      {
        phone: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        name: {
          $regex: search,
          $options: 'i',
        },
      },
    ],
  }).limit(10);

  let result = [];
  let tempResult = {
    receive: [],
    request: [],
    available: [],
    undefined: [],
  };
  searchUsers.forEach((it) => {
    let status = undefined;
    let notificationId = undefined;
    listRelatedId.forEach((childIt) => {
      if (it.id === childIt.id) {
        status = childIt.status;
        notificationId = childIt.notificationId;
      }
    });
    if (it.id.toString() !== id.toString()) {
      tempResult[status].push({
        ...it.toObject(),
        status: status,
        notificationId: notificationId,
      });
    }
  });
  result = [
    ...tempResult.available,
    ...tempResult.receive,
    ...tempResult.request,
    ...tempResult.undefined,
  ];
  console.log(tempResult);

  res.status(200).json({
    result,
  });
});

module.exports = {
  checkUser,
  registerUser,
  loginUser,
  findUser,
  getLoggedUser,
  logoutUser,
};
