'use strict';

const io = require('socket.io')(3001);
const config = require('../config');
const loopQ = require('./loopQ');

//on default connection

// default connection
io.on('connection', (socket) => {
  socket.on('hi', payload => {
    socket.emit('greet', payload);
  });
});


function joinRoom(event){
  io.on('connection', function(socket){
    socket.join(event);
    console.log(`${event} joined!`);
  });
  io.to(event).emit('room-join', event);
}



//namespaces - need a for loop to iteriate over the env files
let cats = io.of('/cats');
let dogs = io.of('/dogs');

//listeners on each namespace
dogs.on('connection', (socket) => {
  console.log('connected to dogs', socket.id);
});

cats.on('connection', (socket) => {
  console.log('connect', socket.id);
  
  socket.on('join', (roomName, cb) => {
    console.log('join', roomName);
    socket.join(roomName);
    cb && cb(`joined ${roomName}`);
  });
});

class Server {
  //creates a new instance of Q in DB
  constructor(qName){
    //this.socket = socket;
    this.qName = qName;
    //this.userId = socket.id;
  }

  connectQ(name){
    let qName = config.queues[name];

    if(!name){throw 'you must enter a Q name';}

    if(!qName){
      throw 'this Q does not exist';
    }

    loopQ();


    //identify if namespace is valid/exists
    //connect user to that namespace
    //return a success or error
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
  }

  static stop(){
    //stops the server
  }


}

//need a function to store connections - make it a config
//check new connections to make sure that namespace exists


module.exports = Server;
