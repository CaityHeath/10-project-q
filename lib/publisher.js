'use stict';

const io = require('socket.io-client');
const config = require('../config');

//const SERVER = process.env.Q_SERVER || 3000;


class Publisher{
  constructor(){
    this.socket = io.connect(`http://localhost:3001`);
    //this.q = io.connect(`${SERVER}`);
  }

  publish(qName, event, payload){
    if(!config.queues[qName]){throw 'That Q does not exist';}

    if(!config.queues[qName].includes(event)){ throw 'That event does not exist';}

    let socket = io.connect(`http://localhost:3001/${qName}`);

    //let message = {queue, event, payload};
    //this.q.emit('publish', message);
    
    socket.on('connected', (name) => {
      console.log(`connected to ${name} `);
      socket.emit(`${event}`, payload);
    });
    socket.on(error => console.error);
    socket.on('disconnect', () => {
      socket.open();
    });
    socket.on('connect_error', (error) => {
      console.error('there was an error connecting you ', error);
    });

    socket.on('connect_timeout', (timeout) => {
      console.log('your connection timed out');
    });

  }

}

module.exports = Publisher;
