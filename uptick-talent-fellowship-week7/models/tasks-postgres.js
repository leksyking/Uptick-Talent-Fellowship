const Sequelize = require("sequelize");

const { sequelize } = require("../database/connectDB");

const Task = sequelize.define("task", {
        id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
        },
        task: {
                type: Sequelize.STRING,
        },
});

module.exports = Task;
