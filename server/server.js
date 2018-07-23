const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
//io used to communicate with sockerIO between server and client using the http server variable
var io = socketIO(server);

const publicPath = path.join(__dirname, "../public");

//use express npm to use the index.html file stored in publicPath var to then
//run the app on PORT 3000 from the terminal and run fron chrome using localhost:3000
app.use(express.static(publicPath));

//used tp register an event listener. In this case a connection event to the server
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Started on Port ${port}`);
});
