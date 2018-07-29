var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};


var generateLocationMessage = (from, latitude, longitude) => {
    //return the user location based on the lat and long values
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    };
};

module.exports = { generateMessage, generateLocationMessage };