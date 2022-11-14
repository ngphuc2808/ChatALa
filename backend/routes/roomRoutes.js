const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { getRoomList, getRoomInfo, changeRoomName, setNickname, addMember } = require("../controllers/roomController");

const router = express.Router();

router.route("/").get(authMiddleware, getRoomList);
router.route("/:roomId").get(authMiddleware, getRoomInfo);
router.route("/:roomId/change-name").put(authMiddleware, changeRoomName);
router.route("/:roomId/nickname").put(authMiddleware, setNickname);
router.route("/:roomId/member").post(authMiddleware, addMember);


module.exports = router;
