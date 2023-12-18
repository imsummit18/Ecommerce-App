const { addAddress, getAddress } = require("../controller/addressController");
const express = require("express");
const router = express.Router();

router.route("/").post(addAddress);
router.route("/").get(getAddress);
module.exports = router;
