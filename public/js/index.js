var socket = io();
socket.on('connect', function(e) {
    console.log('connected', e);
    socket.emit('createMessage', {
        'from': 'client sumit',
        'text': 'emit this create message event'
    });
});
socket.on('newMessage', function(msg) {
    console.log('new message payload', msg);
});