require("dotenv").config();
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const connectDB = require("./db/connectDB");

app.use(express.static("public"));

const port = process.env.PORT || 3000;

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
