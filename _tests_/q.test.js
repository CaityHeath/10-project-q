'use strict';

const consoleSpy = jest.spyOn(console, 'log');
const Publisher = require('../lib/publisher');
const Server = require('../lib/server');
const Subscriber = require('../lib/subscriber');
const config = require('../config');

beforeAll(()=>{
  Server.start();
  for (let name in config.queues){
    new Server(name);
  }
});

afterAll(Server.stop);

describe('building Qs', () => {
  it('sends a success message when user connect to an available Q', (done) => {
    let publisher = new Publisher();
    publisher.publish('database', 'delete', {});
    setTimeout(()=>{
      expect(consoleSpy).toHaveBeenCalled();
      done();
    },2000);
  });

  it('throws and error when users try to connect to an unavailable Q', () => {
    let publisher = new Publisher();
    expect(() => { publisher.publish('dog', 'bark', {});}).toThrow('That Q does not exist');
  });

  it('sends a success message when user connect to an available event', (done) => {
    let db = new Subscriber('database');
    db.subscribe('delete', {});
    setTimeout(()=>{
      expect(consoleSpy).toHaveBeenCalled();
      done();
    },2000);
  });

  it('throws and error is the user is already subscribed to an event', (done) => {
    let db = new Subscriber('database');
    db.subscribe('delete', {});
    setTimeout(() => {
      console.log('subscriptions',db.subscriptions());
      expect( () => {db.subscribe('delete', {});}).toThrow('You are already subscribed to this event');
      done();
    }, 1000);
  });

  it('throws and error when users try to connect to an unavailable event', () => {
    let publisher = new Publisher();
    expect(() => { publisher.publish('database', 'bark', {});}).toThrow('That event does not exist');
  });
});