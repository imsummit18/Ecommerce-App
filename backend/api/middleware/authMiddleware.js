const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const AppError = require("../../appError");
const { promisify } = require("util");

const authCheck = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json({ error: "Token doesnot exist" });
    }

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // jwt.verify(token, "sumitghimrie", async (err, payload) => {
    //   console.log("the err is", err);
    //   if (err) {
    //     return res.status(401).json({ error: `You must logged in ${err}` });
    //   }
    //   const { userId } = payload;
    //   const newUser = await User.findById(userId);
    //   if (!newUser) {
    //     return next(new AppError("user not found", 400));
    //   }
    //   req.user = newUser;
    //   next();
    // });

    const decoded = await promisify(jwt.verify)(token, "sumitghimire");
    const newUser = await User.findById(decoded.id.userId);
    if (!newUser) {
      return next(new AppError("user not found", 400));
    }
    req.user = newUser;
    next();
  } catch (err) {
    console.log("the err is", err);
  }
};
module.exports = { authCheck };
