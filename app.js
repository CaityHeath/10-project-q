'use strict';

const Q = require('./lib/server.js');
const config = require('./config');

//start the default socket listener
Q.start();

//add all listeners and monitors for namespaces
for (let name in config.queues){
  let queue = new Q(name);
  config.queues[name].forEach(room => {
    queue.monitorEvent(room);
  });
}


