'use strict';

const io = require('socket.io')(3001);
const config = require('../config');

//on default connection

// default connection
io.on('connection', (socket) => {
  socket.on('hi', payload => {
    socket.emit('greet', payload);
  });
});

//generate namespaces based off of the config files
//io.on connect for each namespace
function loopQ(){
  for(let name in config.queues){
    io.of(`/${name}`).on('connection', (socket) => {
      console.log(`connected to ${name}`, socket.id);
      socket.broadcast.emit('connected', name);
      console.log(`successfully connected to ${name}`);
    });
  }
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

  connectEvent(qName, event){
    //determie if event exists 
    //callback with success or error message upon joining
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
