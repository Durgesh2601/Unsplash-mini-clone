const express = require("express");
const app = express();
const cors = require("cors");
const postController = require("./Controllers/post.controller");
app.use(cors());
app.use(express.json());

app.use("/", postController);

module.exports = app;