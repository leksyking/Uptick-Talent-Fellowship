const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    username: {
        string: true,
        required: true,
        unique: true,
        trim: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = model("Message", messageSchema);
