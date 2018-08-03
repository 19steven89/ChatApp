const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const { generateMessage, generateLocationMessage } = require("./utils/message");

const { isRealString } = require("./utils/validation.js");
const { Users } = require("./utils/users.js");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
//io used to communicate with sockerIO between server and client using the http server variable
var io = socketIO(server);
var users = new Users();

const publicPath = path.join(__dirname, "../public");

//use express npm to use the index.html file stored in publicPath var to then
//run the app on PORT 3000 from the terminal and run fron chrome using localhost:3000
app.use(express.static(publicPath));

//used to register an event listener. In this case a connection event to the server
io.on("connection", (socket) => {
    console.log("New user connected");

    //set up event listener for connecting to chat room, set up in chat.js
    socket.on("join", (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback("Name and room name are required");
        }

        //used to add users to a specific rooms
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        //update the user list. i.e the active users currently within a specific chat room
        io.to(params.room).emit("updateUserList", users.getUserList(params.room))

        //call function from message.js passing in the from and text arguments
        socket.emit("newMessage", generateMessage("Admin", "Welcome to the Chat App"));

        //sneds message to every user connected to the chat room except the person that  has joined
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined`));
        callback();
    });

    socket.on("createMessage", (msg, callback) => {
        var user = users.getUser(socket.id);

        //if user exists
        if (user && isRealString(msg.text)) {
            //io.emit emits an event to every single connection, i.e. if a user creates a msg in the chat
            //we want to display that msg to all active users
            io.to(user.room).emit("newMessage", generateMessage(user.name, msg.text));
        }

        //this callback will call the console.log("Got It!"); callback argument from index.js
        callback();
    });

    //when user location sent from client side, output the user location
    socket.on("createLocationMessage", (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            //call method from message.js, passing in the lat and long values to return the user location
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on("disconnect", () => {
        console.log("client disconnected");

        var user = users.removeUser(socket.id);
        if (user) {
            //update the user list for the chat room when a user leaves the room
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Started on Port ${port}`);
});