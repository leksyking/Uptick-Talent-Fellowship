require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//middlewares and routes
const { ConnectDb, sequelize } = require("./database/connectDB");
const taskRoute = require("./routes/tasks");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFoundMiddleware = require("./middlewares/notFound");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("<h1>Task Management API</h1>"));
app.use("/api/v1/task", taskRoute);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const server = async () => {
        try {
                await ConnectDb(process.env.MONGO_URI);
                console.log("Successfully connected to the mongodb database");
                await sequelize.sync();
                console.log(
                        "Successfully connected to the postgresql database"
                );
                app.listen(port);
                console.log(`Server started successfully on port ${port}`);
        } catch (error) {
                console.log(error);
        }
};
server();

module.exports = server;
