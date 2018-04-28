var socket = io();
var locBtn = $('#loc-btn');
socket.on('connect', function(e) {
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('no error')
        }
    })
});
socket.on('newMessage', function(msg) {
    var time = moment(msg.createdAt).format('h:mm a');
    var tmp = $('#tmp-message').html();
    var msg = Mustache.render(tmp, {
        from: msg.from,
        time: time,
        message: msg.text
    });
    $('#messages').append(msg);
    scrollToBottom();
});
socket.on('newlocationMessage', function(msg) {
    var time = moment(msg.createdAt).format('h:mm a');
    var tmp = $('#tmp-location-message').html();
    var msg = Mustache.render(tmp, {
        from: msg.from,
        time: time,
        url: msg.url
    });
    $('#messages').append(msg);
    scrollToBottom();
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    })
});

locBtn.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locBtn.attr('disabled', 'disabled').text('sharing ...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locBtn.removeAttr('disabled').text('share location');
        socket.emit('createLocMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
    }, function() {
        locBtn.removeAttr('disabled').text('share location');
    });
});

function scrollToBottom() {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    var clientH = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollH = messages.prop('scrollHeight');
    var newMsgH = newMessage.innerHeight();
    var lastMsgH = newMessage.prev().innerHeight();
    if (clientH + scrollTop + newMsgH + lastMsgH >= scrollH) {
        messages.scrollTop(scrollH);
    }
}