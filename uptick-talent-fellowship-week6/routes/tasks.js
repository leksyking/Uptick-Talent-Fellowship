const express = require("express");
const router = express.Router();
const {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");
const authentication = require("../middlewares/authentication");

router
    .route("/")
    .get(authentication, getAllTasks)
    .post(authentication, createTask);
router
    .route("/:id")
    .get(authentication, getSingleTask)
    .patch(authentication, updateTask)
    .delete(authentication, deleteTask);

module.exports = router;
