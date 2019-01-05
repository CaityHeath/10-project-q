'use stict';

const io = require('socket.io-client');

class Publisher{
  constructor(){
  }

  publish(qName, event, payload){
    //listens for messages from user
    //emit a message to everyone in that qName who is subcribed to event with payload
  }

}

module.exports = Publisher;
