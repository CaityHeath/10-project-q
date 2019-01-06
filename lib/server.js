'use strict';

const config = require('../config');

let io;

class Server {
  //creates a new instance of a namespace 
  constructor(qName){
    let qio = io.of(`/${qName}`);
    qio.on('connection', (socket) => {
      console.log('connection', qName);

      //setting up listeners for each event in each namespace
      //if anyone connected to the namespace emits an event, it will broadcase it to the room
      config.queues[qName].forEach(event => {
        // event emitted from the connecting client (e.g. publisher)
        socket.on(event, (payload)=>{
          qio.to(event).emit(event, payload);
          console.log(`emitting ${event} from server with`, payload);
        });
      });

      //listening to the subscriber for a join event
      socket.on('join', (event)=> {
        console.log('join request', event);
        //if the event does not exist
        if(!config.queues[qName].includes(event)){ 
          return socket.emit('event-join-error', event);
        }
        
        socket.join(event);
        socket.emit('event-join', event);

      });

      //emiting to the subscriber so they can send a success message
      socket.emit('connected', qName);
      console.log(`successfully connected to ${qName}`);
    });
    this.qName = qName;
  }

  static start(){
    // default connection
    io = require('socket.io')(3001);
    io.on('connection', (socket) => {
      console.log('someone connected to default namespace');
      socket.on('hi', payload => {
        socket.emit('greet', payload);
      });
    });
    console.log(`server start`);
  }

  static stop(){
    //stops the server
    console.log('disconnect');
    io.close();
  }
}



module.exports = Server;
