const express = require("express");
const router = express.Router();
const { createTask } = require("../controllers/tasks");

router.post("/", createTask);

module.exports = router;
