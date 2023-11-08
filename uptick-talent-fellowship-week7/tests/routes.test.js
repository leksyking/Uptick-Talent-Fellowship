const request = require("supertest");
const app = require("../app");

describe("Tasks Endpoints", () => {
        it("should create a new task", async () => {
                const res = await request(app).post("/api/v1/task").send({
                        task: "Let's do this!",
                });
                console.log(res);
                expect(res.statusCode).toEqual(201);
                expect(res.body).toHaveProperty("task");
        });

        // it("should fetch a single task", async () => {
        //         const taskId = 1;
        //         const res = await request(app).get(`/api/v1/task${taskId}`);
        //         expect(res.statusCode).toEqual(200);
        //         expect(res.body).toHaveProperty("task");
        // });

        // it("should fetch all tasks", async () => {
        //         const res = await request(app).get("/api/v1/task");
        //         expect(res.statusCode).toEqual(200);
        //         expect(res.body).toHaveProperty("task");
        //         expect(res.body.posts).toHaveLength(1);
        // });

        // it("should update a task", async () => {
        //         const res = await request(app).patch("/api/v1/task/1").send({
        //                 task: "Let's do it",
        //         });

        //         expect(res.statusCode).toEqual(200);
        //         expect(res.body).toHaveProperty("task");
        //         expect(res.body.post).toHaveProperty("title", "updated title");
        // });

        // it("should return status code 500 if db constraint is violated", async () => {
        //         const res = await request(app).post("/api/v1/task").send({
        //                 title: "test is cool",
        //                 content: "Lorem ipsum",
        //         });
        //         expect(res.statusCode).toEqual(500);
        //         expect(res.body).toHaveProperty("error");
        // });

        // it("should delete a post", async () => {
        //         const res = await request(app).delete("/api/v1/task/1");
        //         expect(res.statusCode).toEqual(204);
        // });

        // it("should respond with status code 404 if resource is not found", async () => {
        //         const taskId = 1;
        //         const res = await request(app).get(`/api/v1/task/${taskId}`);
        //         expect(res.statusCode).toEqual(404);
        // });
});
