const moment = require("moment");
const User = require("../models/message");

const formatMessage = (username, text) => {
        return {
                username,
                text,
                time: moment().format("h:mm a"),
        };
};

// join user to chat
const userJoin = async (id, username, room) => {
        let user = await User.findOne({ username });
        if (user) return user;
        user = await User.create({ socketId: id, username, room });
        return user;
};

//get current user
const getCurrentUser = async (id) => {
        const users = await User.findOne({ socketId: id });
        return users;
};

//user leaves chat
const userLeave = async (id) => {
        const users = await User.findOne({ socketId: id });
        let user = users;
        await User.deleteOne({ socketId: id });
        return user;
};

//Get room users
const getRoomUsers = async (room) => {
        const users = await User.find({ room });
        return users;
};

module.exports = {
        userJoin,
        getCurrentUser,
        userLeave,
        getRoomUsers,
        formatMessage,
};
