var socket = io();

socket.on('connect', function() {
  console.log('Connect to server');
});

socket.on('disconnect', function() {
  console.log('disconnect from server');
});

socket.on('newMsg', function(message) {
  console.log('new message', message);
  var messageOutput = jQuery('<div></div>');
  messageOutput.html(`${message.from}: ${message.text}`);
  jQuery('#messages').append(messageOutput);
});


jQuery('#form-msg').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMsg', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){
    console.log("ok");
  });
});
