'use strict';

const Q = require('./lib/server.js');
//const config = require('./config');
console.log('hello from app.js');

//start the default socket listener
// Q.start();

// const chatQueue = new Q('troll');
// chatQueue.monitorEvent('message');
// chatQueue.monitorEvent('history');

//add all listeners and monitors for namespaces
// for (let name in config.queues){
//   new Q(name);
// }

Q.start();
const database = new Q('database');
database.monitorEvent('update');
database.monitorEvent('create');
database.monitorEvent('read');
database.monitorEvent('delete');


