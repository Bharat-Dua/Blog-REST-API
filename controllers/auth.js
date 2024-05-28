const { User } = require("../models");
const comparePassword = require("../utils/comparePassword");
const generateCode = require("../utils/generateCode");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const sendEmail = require("../utils/sendEmail");

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // signup validation
    // if (!name) {
    //   res.code = 400;
    //   throw new Error("Name is required");
    // }

    // if (!email) {
    //   res.code = 400;
    //   throw new Error("Email is required");
    // }

    // if (!password) {
    //   res.code = 400;
    //   throw new Error("Password is required");
    // }

    // if (password.length < 6) {
    //   res.code = 400;
    //   throw new Error("Password must be at least 6 characters");
    // }
    const hashPasswordValue = await hashPassword(password);
    const isEmailExits = await User.findOne({ email });
    if (isEmailExits) {
      res.code = 400;
      throw new Error("Email already exist");
    }

    const newUser = new User({
      name,
      email,
      password: hashPasswordValue,
      role,
    });
    await newUser.save();
    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered sucessfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }
    const token = generateToken(user);
    res.status(200).json({
      code: 200,
      status: true,
      message: "User logged in sucessfully",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    if (user.isVerified) {
      res.code = 400;
      throw new Error("user already verified");
    }
    const code = generateCode(6);
    user.verificationCode = code;

    await user.save();

    // send email
    await sendEmail({
      emailTo: user.email,
      subject: "Email verification code",
      code,
      content: "verify your account",
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "user varification code send successfully",
    });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    if (user.verificationCode !== code) {
      res.code = 400;
      throw new Error("invalid code");
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "user varified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    const code = generateCode(6);
    user.forgotPasswordCode = code;
    await user.save();
    await sendEmail({
      emailTo: user.email,
      subject: "Password reset code",
      code,
      content: "change your password",
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "forgot password code send successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, verifyCode, verifyUser, forgotPasswordCode };
