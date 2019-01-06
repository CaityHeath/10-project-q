'use stict';

const io = require('socket.io-client');


class Q{
  constructor(qName){
    this.qName = qName;
    this.io = io.connect(`http://localhost:3001/${this.qName}`);
  }

  subscribe(event, payload) {
    io.broadcast.emit('join', (event) => {
      console.log(`you are asking to join ${event} room`);
    });

  }

  subscriptions(event){
    io.on('room-join', (event) => {
      console.log(`you are subscribed ${event} room`);
    });
  }
}

    // socket.on('event-join-error', event => {
  
    // });
module.exports = Q;

