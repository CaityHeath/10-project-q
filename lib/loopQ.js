'use strict';

const config = require('../config');
const io = require('./io');

//generate namespaces based off of the config files
//io.on connect for each namespace


function loopQ(){
  for(let name in config.queues){
    io.of(`/${name}`).on('connection', (socket) => {
      console.log(`connected to ${name}`, socket.id);
      socket.broadcast.emit('connected', name);
      console.log(`successfully connected to ${name}`);
    });
  }
}

module.exports = loopQ;