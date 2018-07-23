//initiate request from client to server and keep the conn open
  var socket = io();

  socket.on("connect", function() {
    //logs msg in browser console
    console.log("Connected to server");

    //params: event name, 2nd is Object properties. The data below is then passed and handled from the server
    socket.emit("createMessage", {
      from: "steven",
      text: "yea that works for me !!"
    });
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
