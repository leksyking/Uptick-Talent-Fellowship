const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
        task: {
                type: String,
        },
});

module.exports = mongoose.model("Task", TasksSchema);
