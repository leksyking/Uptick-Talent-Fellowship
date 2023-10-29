const Task = require("../models/tasks-mongodb");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const createTask = async (req, res) => {
        const task = await Task.create({
                task: req.body.task,
                createdBy: req.user.userId,
        });
        res.status(StatusCodes.CREATED).json({ task });
};

const getAllTasks = async (req, res) => {
        const tasks = await Task.find({ createdBy: req.user.userId });
        if (!tasks) {
                throw new NotFoundError("Tasks do not exist.");
        }
        res.status(StatusCodes.OK).json({ tasks, nBHits: tasks.length });
};

const getSingleTask = async (req, res) => {
        const { id: taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
                throw new NotFoundError("Task doesn't exist.");
        }
        res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
        const { id: taskId } = req.params;
        const task = await Task.findByIdAndUpdate(taskId, req.body, {
                new: true,
                runValidators: true,
        });
        if (!task) {
                throw new NotFoundError("Task doesn't exist.");
        }
        res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
        const { id: taskId } = req.params;
        await Task.findByIdAndDelete(taskId);
        res.status(StatusCodes.OK).json({ msg: "Task deleted successfully!" });
};

module.exports = {
        createTask,
        getAllTasks,
        getSingleTask,
        updateTask,
        deleteTask,
};
