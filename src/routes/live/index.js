const express = require("express");
const router = express.Router();
const { OK } = require("http-status-codes").StatusCodes;

router.get("/", (_req, res) => res.status(OK).send({ message: "Service running ok" }));

module.exports = router;