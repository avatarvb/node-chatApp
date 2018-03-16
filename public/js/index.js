var socket = io();

socket.on('connect', function () {
    console.log('Connect to server');

    socket.emit('createMsg', {
      from: "avatarvb",
      text: "Yap ca marche"
    });
});

socket.on('disconnect', function () {
  console.log('disconnect from server');
});

socket.on('newMsg', function (message) {
  console.log('new message', message);
});
