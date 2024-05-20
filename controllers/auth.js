const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");
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
module.exports = { signup };
