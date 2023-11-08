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
        let task;
        if (isNaN(taskId)) {
                task = await TaskMongo.findById(taskId);
        } else {
                task = await TaskPostgres.findByPk(taskId);
        }
        if (!task) {
                throw new NotFoundError("Task doesn't exist.");
        }
        res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
        const { id: taskId } = req.params;
        const { task } = req.body;
        let fTask;
        if (isNaN(taskId)) {
                fTask = await TaskMongo.findById(taskId);
        } else {
                fTask = await TaskPostgres.findByPk(taskId);
        }
        await TaskMongo.findOneAndUpdate({ task: fTask.task }, { task });
        await TaskPostgres.update(
                { task },
                {
                        where: { task: fTask.task },
                }
        );
        if (!fTask) {
                throw new NotFoundError("Task doesn't exist.");
        }
        res.status(StatusCodes.OK).json({ msg: "Task updated successfully!" });
};

const deleteTask = async (req, res) => {
        const { id: taskId } = req.params;
        let fTask;
        if (isNaN(taskId)) {
                fTask = await TaskMongo.findById(taskId);
        } else {
                fTask = await TaskPostgres.findByPk(taskId);
        }
        await TaskMongo.findOneAndDelete({ task: fTask.task });
        await TaskPostgres.destroy({ where: { task: fTask.task } });
        if (!fTask) {
                throw new NotFoundError("Task doesn't exist.");
        }
        res.status(StatusCodes.OK).json({ msg: "Task deleted successfully!" });
};

module.exports = {
        createTask,
        getAllTasks,
        getSingleTask,
        updateTask,
        deleteTask,
};
