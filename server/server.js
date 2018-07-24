const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const { generateMessage } = require("./utils/message");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
//io used to communicate with sockerIO between server and client using the http server variable
var io = socketIO(server);

const publicPath = path.join(__dirname, "../public");

//use express npm to use the index.html file stored in publicPath var to then
//run the app on PORT 3000 from the terminal and run fron chrome using localhost:3000
app.use(express.static(publicPath));

//used to register an event listener. In this case a connection event to the server
io.on("connection", (socket) => {
    console.log("New user connected");

    //call function from message.js passing in the from and text arguments
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the Chat App"));

    socket.broadcast.emit("newMessage", generateMessage("Admin", "New User Joined"));

    socket.on("createMessage", (msg) => {
        console.log("Msg Created", msg);
        //io.emit emits an event to every single connection, i.e. if a user creates a msg in the chat
        //we want to display that msg to all active users
        io.emit("newMessage", generateMessage(msg.from, msg.text));

        // the difference from the code above is that when a user enters a new message
        // to the chat it only gets broadcast to certain members i.e. all members except the member that sent the msg
        // socket.broadcast.emit("newMessage", {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on("disconnect", () => {
        console.log("client disconnected");
    });
});

server.listen(port, () => {
    console.log(`Started on Port ${port}`);
});