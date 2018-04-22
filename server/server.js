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
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    });
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'welcome to chat',
        createdAt: new Date().getTime()
    });
    socket.on('createMessage', function(msg) {
        io.emit('newMessage', {
                from: msg.from,
                text: msg.text,
                createdAt: new Date().getTime()
            })
            // socket.broadcast.emit('newMessage', {
            //     from: msg.from,
            //     text: msg.text,
            //     createdAt: new Date().getTime()
            // })
    });
});
server.listen(port, () => {
    console.log('started at port ' + port);
});