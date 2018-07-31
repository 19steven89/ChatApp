var moment = require("moment");

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};


var generateLocationMessage = (from, latitude, longitude) => {
    //return the user location based on the lat and long values
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = { generateMessage, generateLocationMessage };