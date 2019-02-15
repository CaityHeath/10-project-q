'use stict';

const io = require('socket.io-client');
const config = require('../config');

class Q{
  constructor(qName){
    this.roomArray = [];
    this.qName = qName;

    if(!config.queues[qName]){throw 'That Q does not exist';}

    this.socket = io.connect(`http://localhost:3001/${this.qName}`);
    this.socket.on('connected', qName => {
      console.log(`${qName} was successfully joined`);
    });

    this.socket.on('event-join', event => {
      this.roomArray.push(event);
      console.log(`user joined the ${event} event`);
    });

    this.socket.on('event-join-error', event => {
      console.log(`user tried to join ${event} but it does not exist`);
    });
  }

  subscribe(event, callback) {
    if(!config.queues[this.qName].includes(event)){ 
      throw 'That event does not exist';
    }

    if(this.roomArray.includes(event)){
      throw 'You are already subscribed to this event';
    }

    //can do an error first cb:
    // socket.emit('join', evernt, (err, status)=> {
    //   if(err){console.error(err)}
    //   else {console.log(status);}
    //});
    // socket.on('trigger', callback);

    this.socket.emit('join', event);
    this.socket.on(event, callback);

  }
  

  subscriptions(){
    //console.log(this.roomArray);
    return this.roomArray;
    //console.log(`you are subscribed ${event} room`);
  }
}

module.exports = Q;

