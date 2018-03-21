const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {
  generateMsg,
  generateLocationMsg
} = require('./utils/message');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit from admin text: welcome
  socket.emit('newMsg', generateMsg('Admin', 'welcome to chat app'));
  // socket.broadcast.emit from admin text: new user joined
  socket.broadcast.emit('newMsg', generateMsg('Admin', 'New user joined, welcome'));

  socket.on('createMsg', (message, callback) => {
    console.log('createMsg', message);
    io.emit('newMsg', generateMsg(message.from, message.text));
    callback('this is from the server');
  })

  socket.on('createLocationMsg', (coords) => {
    io.emit('newLocationMsg', generateLocationMsg('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', (socket) => {
    console.log('user was disconnected');
  });
});



server.listen(3000, () => {
  console.log(`Server is Up on ${port}`);
});
