const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.emit('newMessage', {
        'from': 'sumit',
        'text': 'tadaaaaa',
        'createdAt': new Date().toDateString()
    });
    socket.on('createMessage', function(msg) {
        console.log('create message to be emitted', msg);
    });
});
server.listen(port, () => {
    console.log('started at port ' + port);
});