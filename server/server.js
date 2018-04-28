const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var { generateMessage, generateLocationMessage } = require('./utils/message');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));
    socket.emit('newMessage', generateMessage('Admin', 'welcome to node chat'));
    socket.on('createMessage', function(msg, callback) {
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback();
    });
    socket.on('createLocMessage', function(coords) {
        io.emit('newlocationMessage', generateLocationMessage('Admin', coords.lat, coords.long))
    })
});
server.listen(port, () => {
    console.log('started at port ' + port);
});