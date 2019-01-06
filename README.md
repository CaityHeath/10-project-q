![CF](http://i.imgur.com/7v5ASc8.png) LAB 10
=================================================

## Lab 10 - Q Server

### Authors: Lena Eivy, Caity Heath, Tanner Seramur, and Ryan Gallaway

### Links and Resources
* [repo](https://github.com/applena/10-project-q)
* [travis](https://travis-ci.com/applena/10-project-q.svg?branch=master)
* [back-end](https://lab-10-q-server-ei-ch-ts-rg.herokuapp.com)

### Modules
#### `server.js`, `subscriber.js`, and `publisher.js`
##### Exports Server, Q, and Publisher methods respectively  

**Project: Build a Multi-Tenant Message Queue Server.**

**Summary:**
 
 A Queue server runs independently, and is tasked with routing events and messaging between clients. 

- Any connected client can "publish" a message into the server.
- Any connected client can "subscribe" to receive messages by type.

The Queue server has the ability to see which clients are connected,  to which Queues they are attached and further, to which events they are subscribed.  The Queue server is tasked with receiving any published message and then distributing it out to all connected and subscribed clients. 


### Setup
* `PORT` - Socket runs on port 3001

#### Running the app
* `npm i` to install dependencies
* first terminal: `npm start` starts the server
* second terminal: `node ./client/publisherClient.js` user info
* third terminal: `node ./client/subscriberClient.js` room join

#### Tests
* npm test (runs unit tests)
* npm run  lint (runs linter tests)
* confirms existence/availability of namespace 
* confrims existence/availability of room/event
* confirms user only subscribes to one room/event 

