const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");

const signedKey = asyncHandler(async (req, res, next) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      public_id: "sample_image",
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.status(200).json({
    signature: signature,
    timestamp: timestamp,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
  });
});

module.exports = { signedKey };
