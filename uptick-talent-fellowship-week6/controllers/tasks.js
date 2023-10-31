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

module.exports = {
        createTask,
};
