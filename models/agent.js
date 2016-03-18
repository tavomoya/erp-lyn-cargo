'use strict';

var Entity = require('./entity.js');
var Data = require('./data.js');

function Agent (db) {
  this.db = db;
  Entity.apply(this, Array.prototype.slice.call(arguments));

  // Add more properties to the entity schema
  this.schema.id = '/Agent';

  this.data = new Data(db, 'AGENT', this.schema);
}

Agent.prototype = new Entity();

module.exports = Agent;
