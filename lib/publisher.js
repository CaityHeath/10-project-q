import io from 'socket.io-client';

const SERVER = process.env.Q_SERVER || 'http://localhost:3333';

class Q {

  constructor(q) {
    this.q = io.connect(`${SERVER}`);
  }

  /**
   * Publish an event (room) with payload 
   * @param queue
   * @param event
   * @param payload
   */ 
  publish(queue, event, payload) {
    //console.log('in the publisher with event', event);
    let message = {queue,event,payload};
    this.q.emit('publish', message); 
  }
  
}

export default Q;