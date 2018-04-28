var moment = require('moment');
var generateMessage = function(from, text) {
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    }
}
var generateLocationMessage = function(from, lat, long) {
    return {
        from: from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    }
}
module.exports = { generateMessage, generateLocationMessage };