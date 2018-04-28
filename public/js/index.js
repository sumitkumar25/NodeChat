var socket = io();
socket.on('connect', function(e) {
    console.log('connected', e);
});
socket.on('newMessage', function(msg) {
    console.log('new message payload', msg);
    var msg = $('<li class="message">' + msg.from + ' - ' + msg.text + '</li>')
    $('#messages').append(msg);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {
        console.log('ackowledgement');
    })
})