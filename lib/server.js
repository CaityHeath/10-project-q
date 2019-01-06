'use strict';

const io = require('./io');
const config = require('../config');
const joinRoom = require('./joinRoom');


class Server {
  //creates a new instance of a namespace 
  constructor(qName){
    let qio = io.of(`/${qName}`);
    qio.on('connection', (socket) => {

      config.queues[qName].forEach(room => {
        socket.join(room, (payload) => {
          qio.socket.emit(room, payload);
          console.log('emitting room from server');
        });
      });


      console.log(`connected to ${qName}`);
      socket.broadcast.emit('connected', qName);
      console.log(`successfully connected to ${qName}`);
    });
    this.qName = qName;
  }



  joinEvents(qName, event){
    if(!qName){throw 'you must enter a Q name';}
    if(!config.queues[qName]){
      throw 'this Q does not exist';
    } 
    if(config.queues[qName].includes(event)){
      joinRoom(event);
    }
  }

  monitorEvent(eventName){
    //console.log('inside moniter events');
    //console.log({eventName});
    this.io.on(eventName, (payload) => {
      console.log('inside the listener on events!!!!', {payload});
      this.io.broadcast.emit(`${eventName}`, payload);
    });
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
    // io.on('connection', (socket) => {
    //   console.log('disconnect');
    //   socket.disconnect();

    // });
    // socket.emit('disconnect');
  }
}



module.exports = Server;
