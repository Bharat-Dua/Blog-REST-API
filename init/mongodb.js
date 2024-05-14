const mongoose = require("mongoose");
const {connectionUrl} = require("../config/kyes");
const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("mongodb connected successfully!");
  } catch (error) {
    console.log("Server unavailable", error.message);
  }
};

module.exports = connectMongodb;
