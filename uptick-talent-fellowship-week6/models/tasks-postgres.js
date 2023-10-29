const Sequelize = require("sequelize");

const sequelize = new Sequelize("yourdb", "yourusername", "yourpassword", {
        host: "postgres",
        dialect: "postgres",
});

const Data = sequelize.define("data", {
        value: {
                type: Sequelize.STRING,
        },
});

module.exports = Data;
