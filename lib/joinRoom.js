'use strict';

const io = require('./io');

function joinRoom(event){
  io.on('connection', function(socket){
    socket.join(event);
    console.log(`${event} joined!`);
  });
  io.to(event).emit('room-join', event);
}

module.exports = joinRoom;