'use strict';

const io = require('./io');
const config = require('../config');
const joinRoom = require('./joinRoom');

//on default connection


class Server {
  //creates a new instance of Q in DB
  constructor(qName){
    //this.socket = socket;
    this.io = io.of(`./${qName}`);
    this.io.on('connection', (socket) => {
      console.log(`connected to ${name}`, socket.id);
      socket.broadcast.emit('connected', name);
      console.log(`successfully connected to ${name}`);
    });
    this.qName = qName;
  }

  connectQ(name){
    let qName = config.queues[name];

    if(!name){throw 'you must enter a Q name';}

    if(!qName){
      throw 'this Q does not exist';
    }

    loopQ();
  }

  validateEvents(qName, event){

    if(!qName){throw 'you must enter a Q name';}

    if(!config.queues[qName]){
      throw 'this Q does not exist';
    } 

    if(config.queues[qName].includes(event)){
      joinRoom(event);
    }

  }

  monitorEvent(eventName){

    //listening to events from publisher
    //emitting the events to everyone
  }

  static start(){
    //starts the server
    // default connection
    io.on('connection', (socket) => {
      socket.on('hi', payload => {
        socket.emit('greet', payload);
      });
    });
    loopQ();
  }

  static stop(){
    //stops the server
  }


}

//need a function to store connections - make it a config
//check new connections to make sure that namespace exists


module.exports = Server;
