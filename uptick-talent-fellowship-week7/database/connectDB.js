const mongoose = require("mongoose");
const Sequelize = require("sequelize");

const ConnectDb = (url) => {
        mongoose.set("strictQuery", true);
        return mongoose.connect(url);
};

const sequelize = new Sequelize(
        process.env.POSTGRES_DB,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD,
        {
                host: process.env.POSTGRES_HOST,
                dialect: "postgres",
        }
);

module.exports = { ConnectDb, sequelize };
