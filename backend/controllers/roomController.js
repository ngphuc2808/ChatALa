const asyncHandler = require("express-async-handler");
const Rooms = require("../models/roomModel");
const Messages = require("../models/messageModel");
const ErrorHandler = require("../utils/errorHandler");
const { decodeJWT } = require("../utils/utilFunctions");
const Users = require("../models/userModel");

const getRoomList = asyncHandler(async (req, res, next) => {
  const userId = decodeJWT(req.signedCookies.token);

  const rooms = await Rooms.find({ "users.uid": userId.id });

  if(rooms.length > 0) {
    res.status(200).json({
      rooms
    })
  } else {
    return next(
      new ErrorHandler("Chat room not found!", 404)
    );
  }
});

const getRoomInfo = asyncHandler(async (req, res, next) => {
  const roomId = req.params.id;
  const roomInfo = await Rooms.findById({ _id: roomId });
  const messageInfo = await Messages.find({ roomId: roomId })
  const userId = decodeJWT(req.signedCookies.token);
  let roomAvatar = roomInfo.users[0].avatar;
  let roomName = roomInfo.users[0].nickName;

  if(roomInfo.isGroup) {
    roomAvatar = '';
    roomName = '';
  } else if(roomInfo.users[1].uid !== userId.id) {
    roomAvatar = roomInfo.users[1].avatar;
    roomName = roomInfo.users[1].nickName;
  }

  if(roomInfo) {
    res.status(200).json({
      roomAvatar,
      roomName,
      roomInfo,
      messageInfo
    })
  } else {
    return next(
      new ErrorHandler("Chat message not found!", 404)
    );
  }
});

const changeRoomName = asyncHandler(async (req, res, next) => {
  const roomId = req.params.id;
  const { groupName } = req.body;

  const room = await Rooms.findOneAndUpdate({ _id: roomId }, { $set: { groupName } }, {
    new: true
  });

  res.status(200).json({
    room
  });
});

const setNickname = asyncHandler(async (req, res, next) => {
  const roomId = req.params.id;
  const { uid, nickName } = req.body;

  const room = await Rooms.findOneAndUpdate({ _id: roomId, "users.uid": uid }, { $set: { "users.$.nickName": nickName }}, {
    new: true
  });

  res.status(200).json({
    room
  });
});

const addMember = asyncHandler(async (req, res, next) => {
  const roomId = req.params.id;
  const { uid } = req.body;

  const getMember = await Users.findById({ _id: uid });

  const newMember = await Rooms.findOneAndUpdate({ _id: roomId }, { $push: { users: { uid: uid, role: false, nickName: getMember.name, avatar: getMember.avatar }}}, {
    new: true,
    upsert: true
  });

  res.status(200).json({
    newMember
  });
});

module.exports = { getRoomList, getRoomInfo, changeRoomName, setNickname, addMember };
