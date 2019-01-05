'use stict';

const io = require('socket.io-client');
const cats = io.connect('http://localhost:3001/numbers');
const dogs = io.connect('http://localhost:3000/letters');

class Q{
  constructor(qName){
    this.qName = qName;
  }

  subscribe(socket, event, payload) {
    // subscribe to the event
    
  }

  subscriptions(){
    //returns a list of all of the events that this subscriber has subscribed to
  }
}

module.exports = Q;