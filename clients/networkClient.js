'use strict';

const Connection = require('../lib/subscriber');
const networkQueue = new Connection('network');

networkQueue.subscribe('attack', (payload) => {
  console.log('ATTACK', payload);
});