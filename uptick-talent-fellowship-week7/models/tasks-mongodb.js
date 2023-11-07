const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema(
        {
                task: {
                        type: String,
                },
        },
        { timestamps: true }
);

module.exports = mongoose.model("Task", TasksSchema);
