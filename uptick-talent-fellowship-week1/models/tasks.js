const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema(
    {
        task: {
            type: String,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", TasksSchema);
