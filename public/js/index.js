var socket = io();

socket.on('connect', function() {
  console.log('Connect to server');
});

socket.on('disconnect', function() {
  console.log('disconnect from server');
});

socket.on('newMsg', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMsg', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

jQuery('#send-btn').on('click', function(e) {
  e.preventDefault();
  socket.emit('createMsg', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {
    jQuery('[name=message]').val('')
  });
});

var locationBtn = jQuery('#geo-btn');
locationBtn.on('click', function(e) {
  e.preventDefault();
  if (!navigator.geolocation) {
    return alert('Geolcation not supported by your Browser !');
  }
    locationBtn.attr('disabled', 'disabled').text('').append('<i class="fa fa-spinner fa-spin" style="font-size:18px"></i>');
    navigator.geolocation.getCurrentPosition(function(position) {
      locationBtn.removeAttr('disabled').text('send location');
      // 34.034723899999996, -5.0130554 my position Aalam
      socket.emit('createLocationMsg', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function() {
      locationBtn.removeAttr('disabled').text('send location');
      alert('Unable to Use this option -Geolcation-');
    });



});
