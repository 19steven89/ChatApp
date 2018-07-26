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

    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    jQuery("#messages").append(li);
});

//event name is submit and the function will be fired when the user triggers the event to submit the form
jQuery("#messageForm").on("submit", function(e) {
    //prevent the default behaviour for the event, in this instance it is the page refreshing when a form is submitted 
    e.preventDefault();

    //set up form handler to the server when submitting a message
    socket.emit("createMessage", {
        from: "User",
        //get the message input from the form 
        text: jQuery("[name=message]").val()
    }, function() {

    });
});