'use strict';

const Q = require('../lib/subscriber.js');

const db = new Q('database');

db.subscribe('delete', (payload) => {
  console.log('delete happened', payload);
});

db.subscribe('create', (payload) => {
  console.log('create happened', payload);
});

// db.subscribe('dogs', (payload)=> {
//   console.log('dog happened');
// });

//console.log(db.subscriptions());
