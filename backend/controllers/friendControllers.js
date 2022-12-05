const asyncHandler = require("express-async-handler");
const Notifications = require("../models/notificationModel");
const Friends = require("../models/friendModel");
const ErrorHandler = require("../utils/errorHandler");
const Users = require("../models/userModel");

const getFriendRequestList = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  let listRequest = [];

  const listPending = await Notifications.find({
    receiveId: id,
    status: "Pending",
  });

  for (const pending of listPending) {
    if (pending.receiveId.toString() === id.toString()) {
      let getUser = await Users.findById(pending.requestId);
      listRequest.push({
        _id: pending._id,
        uid: pending.requestId,
        name: getUser.name,
        avatar: getUser.avatar,
        banner: getUser.banner,
        phone: getUser.phone,
        gender: getUser.gender,
        dob: getUser.dob,
        createdAt: pending.createdAt,
        updatedAt: pending.updatedAt,
      });
    }
  }

  res.status(200).json(listRequest);
});

const friendReq = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const receiveId = req.params.id;

  const friend = await Friends.findOne({
    $or: [
      {
        uid1: id,
        uid2: receiveId,
      },
      {
        uid1: receiveId,
        uid2: id,
      },
    ],
  });
  if (!friend) {
    await Notifications.create({
      receiveId: receiveId,
      requestId: id,
    });
    return res.status(200).json({
      receiveId,
    });
  } else {
    return next(new ErrorHandler("Already friend!", 400));
  }
});

const friendAccept = asyncHandler(async (req, res, next) => {
  const notificationId = req.params.id;
  const notification = await Notifications.findById(notificationId);
  const inRelationship = await Friends.findOne({
    $or: [
      {
        uid1: notification.requestId,
        uid2: notification.receiveId,
      },
      {
        uid1: notification.receiveId,
        uid2: notification.requestId,
      },
    ],
  });
  if (notification && notification.status == "Pending" && !inRelationship) {
    await Notifications.findByIdAndUpdate(notificationId, {
      $set: {
        status: "Accepted",
      },
    });
    await Friends.create({
      uid1: notification.requestId,
      uid2: notification.receiveId,
    });

    return res.status(200).json({
      message: "Accept successfully",
    });
  } else {
    return next(new ErrorHandler("Unhandled error!", 500));
  }
});

const friendDecline = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await Notifications.findByIdAndUpdate(id, {
    $set: {
      status: "Denied",
    },
  });

  return res.status(200).json({
    message: "Decline successfully",
  });
});

const block = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const targetId = req.params.id;

  const friend = await Friends.findOne({
    $or: [
      {
        uid1: id,
        uid2: targetId,
      },
      {
        uid1: targetId,
        uid2: id,
      },
    ],
  });

  if (!friend) {
    await Friends.create({
      uid1: id,
      uid2: targetId,
      status: {
        type: "oneWayBlock",
        blockedId: targetId,
      },
    });
    return res.status(200).json({
      message: "Block successfully",
    });
  } else {
    if (
      friend.status &&
      friend.status.type === "oneWayBlock" &&
      friend.status.blockedId.toString() === id
    ) {
      await Friends.findByIdAndUpdate(friend.id, {
        $set: {
          status: { type: "twoWayBlock", blockedId: undefined },
        },
      });
    }
    if (friend.status && friend.status.type === "available") {
      await Friends.findByIdAndUpdate(friend.id, {
        $set: {
          status: { type: "oneWayBlock", blockedId: targetId },
        },
      });
    }
  }

  return res.status(200).json({
    message: "Block successfully",
  });
});

const unblock = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const targetId = req.params.id;

  const friend = await Friends.findOne({
    $or: [
      {
        uid1: id,
        uid2: targetId,
      },
      {
        uid1: targetId,
        uid2: id,
      },
    ],
  });

  if (friend) {
    if (
      friend.status &&
      friend.status.type === "oneWayBlock" &&
      friend.status.blockedId.toString() === targetId
    ) {
      await Friends.findByIdAndDelete(friend.id);
    }
    if (friend.status && friend.status.type === "twoWayBlock") {
      await Friends.findByIdAndUpdate(friend.id, {
        $set: {
          status: { type: "oneWayBlock", blockedId: id },
        },
      });
    }
  }

  return res.status(200).json({
    message: "Unblock successfully",
  });
});

const friendList = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const friends = await Friends.find({
    $or: [
      {
        uid1: user._id,
      },
      {
        uid2: user._id,
      },
    ],
  });

  const result = [];
  for (const friend of friends) {
    const friendId =
      friend.uid1.toString() === user._id.toString()
        ? friend.uid2
        : friend.uid1;
    const friendInfo = await Users.findById(friendId);
    if (friendInfo) result.push(friendInfo);
  }

  return res.status(200).json(result);
});

module.exports = {
  getFriendRequestList,
  friendReq,
  friendAccept,
  friendDecline,
  block,
  unblock,
  friendList,
};
