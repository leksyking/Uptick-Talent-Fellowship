require("dotenv").config();

module.exports = {
        test: {
                url: process.env.TEST_DATABASE_URL,
                dialect: "postgres",
        },
};
