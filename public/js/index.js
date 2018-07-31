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

    var formattedtime = moment(message.createdAt).format("h:mm a")

    var li = jQuery("<li></li>");
    li.text(`${message.from} ${formattedtime}: ${message.text}`);

    jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
    var li = jQuery("<li></li>");
    var a = jQuery("<a target = \"_blank\">My Current Location</a>");
    var formattedtime = moment(message.createdAt).format("h:mm a")

    li.text(`${message.from} ${formattedtime}: `);
    a.attr("href", message.url);
    li.append(a);
    jQuery("#messages").append(li);
});

//event name is submit and the function will be fired when the user triggers the event to submit the form
jQuery("#messageForm").on("submit", function(e) {
    //prevent the default behaviour for the event, in this instance it is the page refreshing when a form is submitted 
    e.preventDefault();

    var msgTextBox = jQuery("[name=message]");

    //set up form handler to the server when submitting a message
    socket.emit("createMessage", {
        from: "User",
        //get the message input from the form 
        text: msgTextBox.val()
    }, function() {
        //clear the message text field when the message is sent
        msgTextBox.val("");
    });
});

var locationButton = jQuery("#sendLocation");
locationButton.on("click", function() {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported on this browser!");
    }

    //disable the button while the location is being processed
    locationButton.attr("disabled", "disabled").text("Sending Location...");

    //get the users coords if successful and emit lat and long pos of user using socket.emit
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr("disabled").text("Send Location");
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        //enable the button after the location is processed again
        locationButton.removeAttr("disabled").text("Send Location");
        alert("Unable to fetch location!")
    });
});