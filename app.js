const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tweetRouter = require("./routes/tweet");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// route for managing tweets
app.use("/tweet", tweetRouter);
module.exports = app;
