const asyncHandler = require("express-async-handler");
const Notifications = require("../models/notificationModel");
const { decodeJWT } = require("../utils/utilFunctions");

const friendReq = asyncHandler(async (req, res, next) => {
  const { id } = decodeJWT(req.signedCookies.token);
  const receiveId = req.params.id;

  const notifications = await Notifications.findOneAndUpdate(
    {
      receiveId: receiveId,
      requestId: id,
      status: "Denied",
    },
    {
      $set: {
        status: "Pending",
      },
    }
  );

  !notifications &&
    Notifications.create({
      receiveId: receiveId,
      requestId: id,
    });

  console.log(notifications);

  res.status(200).json({
    message: "Request successfully",
  });
});

module.exports = { friendReq };
