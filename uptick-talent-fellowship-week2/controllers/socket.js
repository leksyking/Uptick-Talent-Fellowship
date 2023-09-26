const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require("./message");

const formatMessage = require("./utils/messages");

const botName = "Chat App";
//Run when client connects
io.on("connection", (socket) => {
    //handle join room
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        //emits to the client making the connection
        socket.emit("message", formatMessage(botName, "Welcome to ChatCord"));

        //broadcast when a client connects
        //emits to everybody except the user
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                formatMessage(botName, `${user.username} has joined the chat`)
            );

        //send user and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    //handle the emit chat message from the client
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    //Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            //to all clients in the room
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the chat`)
            );

            //send user and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});
