'use strict';

const Q = require(__dirname+'/../lib/server.js');

let client = new Q('dog');
client.joinEvents('dog', 'create');

