const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes;
const express = require("express");
const helmet = require("helmet");


const app = express();
app.use(express.json());
require('./routes')(app);
// const isValidUser = require("./middleware/isValidUser");
// app.use(isValidUser);

app.use(helmet());
module.exports = app;
