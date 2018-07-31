var moment = require("moment");

//create new moment object that represents a new moment in time
var date = moment();

// var createdAt = 1234;
// var date = moment(createdAt);
// console.log(date.format("h:mm a"));

// date.add(100, "year").subtract(2, "months");
// console.log(date.format("MMM Do YYYY"));

var exampleTimestamp = moment().valueOf();
console.log(exampleTimestamp);