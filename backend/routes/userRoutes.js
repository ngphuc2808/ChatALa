const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  checkUser,
  registerUser,
  loginUser,
  findUser,
  getLoggedUser,
  logoutUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/checkUser").get(checkUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getLoggedUser").get(authMiddleware, getLoggedUser);
router.route("/find").post(authMiddleware, findUser);
router.route("/logout").get(authMiddleware, logoutUser);

module.exports = router;
