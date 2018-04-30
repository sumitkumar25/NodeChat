const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validators');
const { Users } = require('./utils/users');
var users = new Users();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('join', (param, callback) => {
        if (!isRealString(param.name) || !isRealString(param.room)) {
            return callback('room or name is invalid');
        }
        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);
        io.to(param.room).emit('updateUserList', users.getUserList(param.room));
        socket.emit('newMessage', generateMessage('Admin', 'welcome to Node chat'));
        socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin', `${param.name} Joined.`));
        callback();
    });
    socket.on('createMessage', function(msg, callback) {
        var user = users.getUser(socket.id);
        if (user && isRealString(msg.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
        }
        callback();
    });
    socket.on('createLocMessage', function(coords) {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newlocationMessage', generateLocationMessage(user.name, coords.lat, coords.long))
        }
    });
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left`));
        }
    });
});
server.listen(port, () => {
    console.log('started at port ' + port);
});