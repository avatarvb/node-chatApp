const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath =path.join(__dirname + '/../public');
const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('createMsg', (message) => {
    console.log('create Msg', message);
    io.emit('newMsg', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  })

  socket.on('disconnect', (socket) => {
    console.log('user was disconnected');
  });
});



server.listen(3000, () => {
  console.log(`Server is Up on ${port}`);
});
