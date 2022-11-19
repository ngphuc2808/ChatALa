const asyncHandler = require('express-async-handler');
const Notifications = require('../models/notificationModel');
const { decodeJWT } = require('../utils/utilFunctions');
const Friends = require('../models/friendModel');
const ErrorHandler = require('../utils/errorHandler');

const friendReq = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const receiveId = req.params.id;

  const friend = await Notifications.findOne({
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
    const notification = await Notifications.findOneAndUpdate(
      {
        receiveId: receiveId,
        requestId: id,
      },
      {
        $set: {
          status: 'Pending',
        },
      }
    );

    !notification &&
      Notifications.create({
        receiveId: receiveId,
        requestId: id,
      });

    res.status(200).json({
      message: 'Request successfully',
    });
  } else {
    res.status(500).json({
      message: 'Unhandled error!',
    });
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
  if (notification && notification.status == 'Pending' && !inRelationship) {
    await Notifications.findByIdAndUpdate(notificationId, {
      $set: {
        status: 'Accepted',
      },
    });
    await Friends.create({
      uid1: notification.requestId,
      uid2: notification.receiveId,
    });
    return res.status(200).json({
      message: 'Accept successfully',
    });
  } else {
    return next(new ErrorHandler('Unhandled error!', 500));
  }
});

const friendDecline = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await Notifications.findOneAndUpdate(id, {
    $set: {
      status: 'Denied',
    },
  });

  res.status(200).json({
    message: 'Decline successfully',
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
        type: 'oneWayBlock',
        blockedId: targetId,
      },
    });
    return res.status(200).json({
      message: 'Block successfully',
    });
  } else {
    if (
      friend.status &&
      friend.status.type === 'oneWayBlock' &&
      friend.status.blockedId.toString() === id
    ) {
      await Friends.findByIdAndUpdate(friend.id, {
        $set: {
          status: { type: 'twoWayBlock', blockedId: undefined },
        },
      });
    }
    if (friend.status && friend.status.type === 'available') {
      await Friends.findByIdAndUpdate(friend.id, {
        $set: {
          status: { type: 'oneWayBlock', blockedId: targetId },
        },
      });
    }
  }

  return res.status(200).json({
    message: 'Block successfully',
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

  console.log(friend);
  if (friend) {
    if (
      friend.status &&
      friend.status.type === 'oneWayBlock' &&
      friend.status.blockedId.toString() === targetId
    ) {
      await Friends.findByIdAndDelete(friend.id);
    }
    if (friend.status && friend.status.type === 'twoWayBlock') {
      await Friends.findByIdAndUpdate(friend.id, {
        $set: {
          status: { type: 'oneWayBlock', blockedId: id },
        },
      });
    }
  }

  res.status(200).json({
    message: 'Unblock successfully',
  });
});

module.exports = { friendReq, friendAccept, friendDecline, block, unblock };
