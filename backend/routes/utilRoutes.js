const express = require("express");
const { signedFileUrl } = require("../controllers/utilControllers");
const authMiddleware = require("../middlewares/auth");
const Messages = require("../models/messageModel");
const Rooms = require("../models/roomModel");

const router = express.Router();

router.route("/signedFileUrl").get(authMiddleware, signedFileUrl);
router.route("/test").get(async (req, res, next) => {

  await Messages.create({
    roomId: '63724d5d1e1e3379eb81b724',
    senderId: '6372476fa2f6d6d3ea49259b',
    files:[
      {
        url: 'https://res.cloudinary.com/dzikgumce/image/upload/v1665681423/cld-sample-5.jpg',
        name: 'image',
        type: 'image'
      },
      {
        url: 'https://res.cloudinary.com/dzikgumce/image/upload/v1665681396/sample.jpg',
        name: 'image',
        type: 'image'
      },
      {
        url: 'https://res.cloudinary.com/dzikgumce/image/upload/v1665681423/cld-sample-5.jpg',
        name: 'image',
        type: 'image'
      },
      {
        url: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        name: 'image',
        type: 'image'
      },
      {
        url: 'https://res.cloudinary.com/dzikgumce/image/upload/v1665681423/cld-sample-5.jpg',
        name: 'image',
        type: 'image'
      },
    ]
  })
  res.send('ok')
});
module.exports = router;

//hung2: 6372476fa2f6d6d3ea49259b
//hung: 63724ac38d855015f2372cad
