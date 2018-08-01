//initiate request from client to server and keep the conn open
var socket = io();

function scrollToBottom() {
    //this method is to automatucally scroll the user to the bottom of the chat if a 
    //message comes in so they are able to view it without scrolling 
    //selectors 
    var messages = jQuery("#messages");
    var newMsg = messages.children("li:last-child");

    //heights. prop() is a jquery method that sets or returns selected values
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMsgHeight = newMsg.innerHeight();
    //takes us to previous child, i.e. if we are at the last list item we are now at the 2nd last item
    var lastMsgHeight = newMsg.prev().innerHeight();

    if (clientHeight + scrollTop + newMsgHeight >= scrollHeight) {
        console.log("Should scroll");
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function() {
    //logs msg in browser console
    console.log("Connected to server");

    //set up code for joining specific chat rooms
    var params = jQuery.deparam(window.location.search);
    socket.emit("join", params, function(err) {
        if (err) {
            alert(err);
            //is the name or room is not correct redirect the user back to the home page, handled in callback function in server.js
            window.location.href = "/";
        } else {
            console.log("No Error");

        }
    });

});

socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

//newMessage params will output the Object in console log, which is coded in the server.js file
//this will listen to data emitted from the server and handle it on the client side, which is
// done here
socket.on("newMessage", function(message) {
    var formattedtime = moment(message.createdAt).format("h:mm a")
    var template = jQuery("#messageTemplate").html();
    var html = Mustache.render(template, {
        //render the users message so that it gets added to the chat
        text: message.text,
        from: message.from,
        createdAt: formattedtime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function(message) {
    var formattedtime = moment(message.createdAt).format("h:mm a")
    var template = jQuery("#locationMessageTemplate").html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedtime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
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