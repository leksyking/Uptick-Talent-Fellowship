const TaskMongo = require("../models/tasks-mongodb");
const TaskPostgres = require("../models/tasks-postgres");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const createTask = async (req, res) => {
        const mongoTask = await TaskMongo.create({
                task: req.body.task,
        });
        const postgresTask = await TaskPostgres.create({
                task: req.body.task,
        });
        res.status(StatusCodes.CREATED).json({ mongoTask, postgresTask });
};

const getAllTasks = async (req, res) => {
        const mongoTasks = await TaskMongo.find();
        const postgresTasks = await TaskPostgres.findAll();
        if (!mongoTasks || !postgresTasks) {
                throw new NotFoundError("Tasks do not exist.");
        }
        res.status(StatusCodes.OK).json({
                mongoTasks,
                postgresTasks,
        });
};

const getSingleTask = async (req, res) => {
        const { id: taskId } = req.params;
        const postgresTask = await TaskPostgres.findByPk(taskId);
        const mongoTask = await TaskMongo.findById(taskId);

        if (!postgresTask || !mongoTask) {
                throw new NotFoundError("Task doesn't exist.");
        }
        res.status(StatusCodes.OK).json({ postgresTask, mongoTask });
};

const updateTask = async (req, res) => {
        const { id: taskId } = req.params;
        const mongoTask = await TaskMongo.findByIdAndUpdate(taskId, req.body, {
                new: true,
                runValidators: true,
        });
        TaskPostgres.update(req.body, {
                where: { id: taskId },
        });
        if (!mongoTask) {
                throw new NotFoundError("Task doesn't exist.");
        }
        res.status(StatusCodes.OK).json({ mongoTask });
};

const deleteTask = async (req, res) => {
        const { id: taskId } = req.params;
        await TaskMongo.findByIdAndDelete(taskId);
        await TaskPostgres.destroy({ where: { id: taskId } });
        res.status(StatusCodes.OK).json({ msg: "Task deleted successfully!" });
};

module.exports = {
        createTask,
        getAllTasks,
        getSingleTask,
        updateTask,
        deleteTask,
};
