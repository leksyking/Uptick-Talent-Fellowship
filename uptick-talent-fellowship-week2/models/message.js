const { Schema, model } = require("mongoose");

const userSchema = new Schema({
        username: {
                type: String,
        },
        text: {
                type: String,
        },
        socketId: {
                type: String,
        },
        room: {
                type: String,
        },
});

module.exports = model("User", userSchema);
