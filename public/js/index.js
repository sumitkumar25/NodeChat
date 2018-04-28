var socket = io();
var locBtn = $('#loc-btn');
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
});

locBtn.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location');
    });
})