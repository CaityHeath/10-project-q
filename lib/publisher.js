'use stict';

const io = require('socket.io-client');


class Publisher{
  constructor(){
    // this.socket = io.connect(`http://localhost:3001`);
  }

  publish(qName, event, payload){

    let socket = io.connect(`http://localhost:3001/${qName}`);
    socket.on('connected', (name) => {
      console.log(`connected to ${name} `, qName);
      socket.emit(`${event}`, payload);
    });
    socket.on(error => {
      console.error;
    });
  }
}

module.exports = Publisher;
