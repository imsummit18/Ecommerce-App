const { default: mongoose } = require("mongoose");
const AppError = require("../../appError");
const User = require("../models/userModel");

const addAddress = async (req, res, next) => {
  try {
    const address = req.body;
    const userId = req.user._id;
    console.log("The user id", userId);
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("USer not found", 400));
    }
    user.address.push(address);
    await user.save();
    res.status(200).json({
      status: "success",
      data: user,
      msg: "Address successfully saved",
    });
  } catch (err) {
    console.log("Error while saving address", err);
    res.status(404).json({ status: "fail", msg: err });
  }
};
const getAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("USer not found", 400));
    }
    const userAddress = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          address: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: userAddress,
    });
  } catch (err) {
    console.log("Error while getting address", err);
    res.status(404).json({ status: "fail", msg: err });
  }
};
module.exports = { addAddress, getAddress };
