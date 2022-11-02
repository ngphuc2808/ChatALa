const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { friendReq } = require("../controllers/friendControllers");

const router = express.Router();

router.route("/request/:id").post(authMiddleware, friendReq);

module.exports = router;
