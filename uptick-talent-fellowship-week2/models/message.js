const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
    },
    text: {
        type: String,
        trim: true,
    },
    socketId: {
        type: String,
        trim: true,
    },
    room: {
        type: String,
        trim: true,
    },
});

module.exports = model("User", userSchema);
