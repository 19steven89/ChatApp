//initiate request from client to server and keep the conn open
var socket = io();

socket.on("connect", function() {
    //logs msg in browser console
    console.log("Connected to server");
});

socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

//newMessage params will output the Object in console log, which is coded in the server.js file
//this will listen to data emitted from the server and handle it on the client side, which is
// done here
socket.on("newMessage", function(message) {
    console.log("New Message", message);
});

socket.emit("createMessage", {
    from: "Frank",
    text: "Hi"
}, function(data) {
    console.log("Got It!");
    console.log(data);
});