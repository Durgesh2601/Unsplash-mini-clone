const express = require("express");
const app = express();
const postController = require("./Controllers/post.controller");

app.use(express.json());

app.use("/", postController);

module.exports = app;