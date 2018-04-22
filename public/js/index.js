var socket = io();
socket.on('connect', function(e) {
    console.log('connected', e);
});
socket.on('newMessage', function(msg) {
    console.log('new message payload', msg);
});