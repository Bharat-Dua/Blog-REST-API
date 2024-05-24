const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const morgan = require("morgan");
const crypto = require("crypto");
dotEnv.config();

const connectMongodb = require("./init/mongodb");
const { authRoute } = require("./routes");
const { errorHandler } = require("./middlewares");
const notFound = require("./controllers/notFound");
// init app
const app = express();

// connect database
connectMongodb();
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));

// route section
app.use("/api/v1/auth", authRoute);

// not found route
app.use("*", notFound);
// error handling middleware
app.use(errorHandler);
module.exports = app;

// generate secret key
const secretKey = crypto.randomBytes(32).toString("hex");
console.log("256 bit secret key ", secretKey);
