'use strict';

const io = require('./io');
const config = require('../config');


class Server {
  //creates a new instance of a namespace 
  constructor(qName){
    let qio = io.of(`/${qName}`);
    qio.on('connection', (socket) => {
      console.log('connection', qName);
      config.queues[qName].forEach(event => {
        // event emitted from the connecting client (e.g. publisher)
        socket.on(event, (payload)=>{
          qio.to(event).emit(event, payload);
          console.log(`emitting ${event} from server with`, payload);
        });
      });
      socket.on('join', (event)=> {
        //if the event does not exist
        if(!config.queues[qName].includes(event)){ 
          return socket.emit('event-join-error', event);
        }
        
        socket.join(event);
        socket.emit('event-join', event);

      });
      socket.emit('connected', qName);
      console.log(`successfully connected to ${qName}`);
    });
    this.qName = qName;
  }

  static start(){
    // default connection
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
    process.exit();
  }
}



module.exports = Server;
