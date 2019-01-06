'use stict';

const io = require('socket.io-client');
const config = require('../config');


class Q{
  constructor(qName){
    this.qName = qName;
    this.socket = io.connect(`http://localhost:3001/${this.qName}`);
    if(!config.queues[qName]){throw 'That Q does not exist';}

    if(!config.queues[qName].includes(event)){ throw 'That event does not exist';}
  }

  subscribe(event, callback) {
    
    this.socket.emit('join', event);

    this.socket.on('event-join', event => {
      console.log(`user joined the ${event} event`);
    });

    this.socket.on('event-join-error', event => {
      console.log(`user tried to join ${event} but it does not exist`);
    });

    this.socket.on(event, callback);

  }
  

  subscriptions(event){
    io.on('room-join', (event) => {
      console.log(`you are subscribed ${event} room`);
    });
  }
}

module.exports = Q;

