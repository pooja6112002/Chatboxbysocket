const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("chat message", (msg) => {
        // sirf dusre users ko bhejna
        socket.broadcast.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(9090, () => {
    console.log("🔥 Server running at http://localhost:9090");
});