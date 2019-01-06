'use strict';

const Q = require('./lib/server.js');
const config = require('./config');
console.log('hello from app.js');
//start the default socket listener
Q.start();

//add all listeners and monitors for namespaces
for (let name in config.queues){
  new Q(name);
}


