'use strict';

const Connection = require('../lib/subscriber.js');

const db = new Connection ('database');

db.subscribe('delete', (payload) => {
  console.log('delete happened', payload);
});

db.subscribe('create', (payload) => {
  console.log('create happened', payload);
});

// db.subscribe('dogs', (payload)=> {
//   console.log('dog happened');
// });


setTimeout(()=>{
  console.log('I am in the following rooms: ',db.subscriptions());
}, 1000);

