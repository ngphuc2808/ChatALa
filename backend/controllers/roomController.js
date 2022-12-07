const asyncHandler = require("express-async-handler");
const Rooms = require("../models/roomModel");
const Messages = require("../models/messageModel");
const ErrorHandler = require("../utils/errorHandler");
const Users = require("../models/userModel");
const mongoose = require("mongoose");

const createRoom = asyncHandler(async (req, res, next) => {
  const { isGroup, users } = req.body;

  if (users.every((user) => user.uid.toString() !== req.user._id.toString())) {
    users.push({
      uid: req.user._id,
      role: true,
      nickname: req.user.name,
      avatar: req.user.avatar,
    });
  } else {
    return next(new ErrorHandler("Group member cannot include creator!", 400));
  }

  let roomToCreate = {};
  roomToCreate.users = users;

  if (isGroup) {
    if (users.length < 3) {
      return next(
        new ErrorHandler(
          "Create group chat but receive less than 2 members!",
          400
        )
      );
    }

    let groupName = users[0].nickname;
    for (let i = 1; i < users.length; i++) {
      if (i < 3) {
        groupName = groupName + ", " + users[i].nickname;
      }
    }
    if (users.length > 3) {
      groupName += "...";
    }
    roomToCreate.groupName = groupName;
    roomToCreate.isGroup = true;
  } else if (users.length > 2) {
    return next(
      new ErrorHandler(
        "Create non-group chat but receive more than 1 member!",
        400
      )
    );
  }

  const createdRoom = await Rooms.create(roomToCreate);

  res.status(200).json(createdRoom);
});

const getRoomList = asyncHandler(async (req, res, next) => {
  const rooms = await Rooms.find({ "users.uid": req.user._id });

  let result = [];
  rooms.forEach((room) => {
    if (!room.isGroup) {
      let roomName;
      let roomAvatar;
      if (room.users[0].uid.toString() === req.user._id.toString()) {
        roomName = room.users[1].nickname;
        roomAvatar = room.users[1].avatar;
      } else {
        roomName = room.users[0].nickname;
        roomAvatar = room.users[0].avatar;
      }
      result.push({ roomName, roomAvatar, roomInfo: room });
    }
    else{
      result.push({ roomName: room.groupName, roomAvatar: "", roomInfo: room });
    }
  });

  res.status(200).json({
    result,
  });
});

const getRoomInfo = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const roomInfo = await Rooms.findById(roomId);
  const messages = await Messages.find({
    roomId: roomId,
  })
    .sort({ createdAt: -1 })
    .limit(50);

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
  const { uid, nickname } = req.body;

  const room = await Rooms.findOneAndUpdate(
    { _id: roomId, "users.uid": uid },
    { $set: { "users.$.nickname": nickname } },
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
            nickname: getMember.name,
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
  createRoom,
  getRoomList,
  getRoomInfo,
  changeRoomName,
  setNickname,
  addMember,
};
