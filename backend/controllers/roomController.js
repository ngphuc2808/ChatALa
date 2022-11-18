const asyncHandler = require("express-async-handler");
const Rooms = require("../models/roomModel");
const Messages = require("../models/messageModel");
const ErrorHandler = require("../utils/errorHandler");
const Users = require("../models/userModel");

const getRoomList = asyncHandler(async (req, res, next) => {
  const rooms = await Rooms.find({ "users.uid": req.user._id });

  let result = [];
  if (rooms.length > 0) {
    rooms.forEach((room) => {
      if (!room.isGroup) {
        let roomName =
          room.users[0].uid.toString() === req.user._id.toString()
            ? room.users[1].nickname
            : room.users[0].nickname;
        let roomAvatar =
          room.users[0].uid.toString() === req.user._id.toString()
            ? room.users[1].avatar
            : room.users[0].avatar;
        result.push({ roomName, roomAvatar, roomInfo: room });
      }
    });

    res.status(200).json({
      result,
    });
  } else {
    return next(new ErrorHandler("Chat room not found!", 404));
  }
});

const getRoomInfo = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const roomInfo = await Rooms.findById(roomId);
  const messageList = await Messages.find({
    roomId: roomId,
  }).sort({ updatedAt: -1 });

  let messages = [];
  messageList.forEach((message) => {
    if (message.senderId.toString() === req.user._id.toString()) {
      const temp = message.toJSON();
      const { senderId, ...rest } = temp;
      messages.push({ fromSender: true, ...rest });
    } else {
      const temp = message.toJSON();
      const { senderId, ...rest } = temp;
      messages.push({ fromSender: false, ...rest });
    }
  });

  let roomAvatar = roomInfo.users[0].avatar;
  let roomName = roomInfo.users[0].nickname;

  if (roomInfo.isGroup) {
    roomAvatar = "";
    roomName = "";
  } else if (roomInfo.users[1].uid.toString() !== req.user._id.toString()) {
    roomAvatar = roomInfo.users[1].avatar;
    roomName = roomInfo.users[1].nickname;
  }

  if (roomInfo) {
    res.status(200).json({
      roomAvatar,
      roomName,
      roomInfo,
      messages,
    });
  } else {
    return next(new ErrorHandler("Room not found!", 404));
  }
});

const changeRoomName = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const { groupName } = req.body;

  const room = await Rooms.findOneAndUpdate(
    { _id: roomId },
    { $set: { groupName } },
    {
      new: true,
    }
  );

  res.status(200).json({
    room,
  });
});

const setNickname = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const { uid, nickName } = req.body;

  const room = await Rooms.findOneAndUpdate(
    { _id: roomId, "users.uid": uid },
    { $set: { "users.$.nickName": nickName } },
    {
      new: true,
    }
  );

  res.status(200).json({
    room,
  });
});

const addMember = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const { uid } = req.body;

  const getMember = await Users.findById({ _id: uid });

  const getRoom = await Rooms.findById({ _id: roomId });

  const findUser = getRoom.users.filter((value) => {
    return value.uid == uid;
  });

  if (findUser.length > 0) {
    return next(
      new ErrorHandler(`${getMember.name} was added to the group!`, 404)
    );
  } else {
    const newMember = await Rooms.findOneAndUpdate(
      { _id: roomId },
      {
        $push: {
          users: {
            uid: uid,
            role: false,
            nickName: getMember.name,
            avatar: getMember.avatar,
          },
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json({
      newMember,
    });
  }
});

module.exports = {
  getRoomList,
  getRoomInfo,
  changeRoomName,
  setNickname,
  addMember,
};
