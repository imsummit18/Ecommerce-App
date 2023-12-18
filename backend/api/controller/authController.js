const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../appError");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const createToken = (id) => {
  return jwt.sign({ id }, "sumitghimire", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
 
const sendVerificationEmail = async (email, verificationToken) => {
  // create a nodemailer trasnport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sumitghimire018@gmail.com",
      pass: "dwhz qiqo fuex lqrq",
    },
  });
  //
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify the email:http://192.168.1.66:8000/api/user/verify/${verificationToken}`,
  };
  // send the email

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error sending verification email");
  }
};

const signUp = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return next(new AppError("User already exist", 400));
    }
    const newUser = await new User({ email, name, password });
    // generate verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    const token = createToken(newUser._id);
    await newUser.save();

    // send verification token to email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({ status: "success", data: newUser, token: token });
  } catch (err) {
    res.send(err);
    console.log("Error is", err);
  }
};

const signIn = async (req, res, next) => {
  console.log("sign  In");
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new AppError("Must provide email and password", 422));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User not found with this email", 400));
    }
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return next(new AppError("Password didnot match", 400));
    }
    const token = createToken({ userId: user._id });
    res.status(200).json({ status: "success", msg: user, token: token });
  } catch (err) {
    res.send(err);
    console.log("Error is", err);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return next(new AppError("Invalid verfication token", 404));
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res
      .status(200)
      .json({ status: "success", msg: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ data: err, msg: "Email verification failed" });
  }
};
module.exports = { signUp, signIn, verifyToken };
