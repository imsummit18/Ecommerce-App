const express = require("express");
const { signUp, signIn, verifyToken } = require("../controller/authController");
const { authCheck } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/verify/:token").get(verifyToken);

module.exports = router;
