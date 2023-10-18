require("dotenv").config();
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const {
        userJoin,
        getCurrentUser,
        userLeave,
        getRoomUsers,
        formatMessage,
} = require("./controllers/message");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const connectDB = require("./db/connectDB");

//set static folder
app.use(express.static("public"));

const botName = "Chat App";
//Run when client connects
io.on("connection", async (socket) => {
        //handle join room
        socket.on("joinRoom", async ({ username, room }) => {
                const user = await userJoin(socket.id, username, room);

                socket.join(user.room);

                //emits to the client making the connection
                socket.emit(
                        "message",
                        formatMessage(botName, "Welcome to Chat App")
                );

                //broadcast when a client connects
                //emits to everybody except the user
                socket.broadcast
                        .to(user.room)
                        .emit(
                                "message",
                                formatMessage(
                                        botName,
                                        `${user.username} has joined the chat`
                                )
                        );

                //send user and room info
                io.to(user.room).emit("roomUsers", {
                        room: user.room,
                        users: await getRoomUsers(user.room),
                });
        });

        //handle the emit chat message from the client
        socket.on("chatMessage", async (msg) => {
                const user = await getCurrentUser(socket.id);

                io.to(user.room).emit(
                        "message",
                        formatMessage(user.username, msg)
                );
        });

        //Runs when client disconnects
        socket.on("disconnect", async () => {
                const user = await userLeave(socket.id);
                if (user) {
                        //to all clients in the room
                        io.to(user.room).emit(
                                "message",
                                formatMessage(
                                        botName,
                                        `${user.username} has left the chat`
                                )
                        );

                        //send user and room info
                        io.to(user.room).emit("roomUsers", {
                                room: user.room,
                                users: await getRoomUsers(user.room),
                        });
                }
        });
});

const port = process.env.PORT || 5000;

(async () => {
        try {
                await connectDB(process.env.MONGO_URI);
                console.log("Successfully connected to the database");
                server.listen(port);
                console.log(`Server started successfully on port ${port}`);
        } catch (error) {
                console.log(error);
        }
})();
