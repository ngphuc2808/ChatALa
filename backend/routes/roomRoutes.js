const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { getRoomList, getRoomInfo, changeRoomName, setNickname, addMember } = require("../controllers/roomController");

const router = express.Router();

router.route("/").get(authMiddleware, getRoomList);
router.route("/:id").get(authMiddleware, getRoomInfo);
router.route("/:id/change-name").put(authMiddleware, changeRoomName);
router.route("/:id/nickname").put(authMiddleware, setNickname);
router.route("/:id/member").post(authMiddleware, addMember);


module.exports = router;
