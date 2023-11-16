const axios = require("axios");
const mongoose = require("mongoose");
const { sequelize } = require("../database/connectDB");
require("dotenv").config();

afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
        console.log("Disconnected from MongoDB");
        await sequelize.close();
        console.log("Disconnected from Sequelize");
});

describe("Tasks Endpoints", () => {
        const serverAddress = process.env.SERVER_ADDRESS;
        const taskId = "655445dcd354670e356ab868";
        const responseObject = { msg: "Task updated successfully!" };

        it("should create a new task", async () => {
                const res = await axios.post(`${serverAddress}`, {
                        task: "Let's do this!",
                });
                expect(res.status).toEqual(201);
                expect(res.data).toHaveProperty("mongoTask");
                expect(res.data).toHaveProperty("postgresTask");
        });

        it("should fetch a single task", async () => {
                const res = await axios.get(`${serverAddress}/${taskId}`);
                expect(res.status).toEqual(200);
                expect(res.data).toHaveProperty("task");
        });

        it("should fetch all tasks", async () => {
                const res = await axios.get(`${serverAddress}`);
                expect(res.status).toBe(200);
                expect(res.data).toHaveProperty("mongoTasks");
                expect(res.data).toHaveProperty("postgresTasks");
        });

        it("should update a task", async () => {
                const res = await axios.patch(`${serverAddress}/${taskId}`, {
                        task: "we have done it",
                });

                expect(res.status).toEqual(200);
                expect(res.data).toMatchObject(responseObject);
        });

        it("should delete a post", async () => {
                const res = await axios.delete(`${serverAddress}/${taskId}`);
                expect(res.status).toEqual(200);
        });

        it("should respond with status code 404 if resource is not found", async () => {
                try {
                        const res = await axios.get(
                                `${serverAddress}/${taskId}`
                        );
                        expect(res.status).not.toBe(200);
                } catch (error) {
                        expect(error.response.status).toBe(404);
                }
        });
});
