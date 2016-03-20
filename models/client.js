'use strict';

var Entity = require('./entity.js');
var Data = require('./data.js');

function Client (db) {
  this.db = db;
  Entity.apply(this, Array.prototype.slice.call(arguments));

  // Add more properties to the entity schema
  this.schema.id = '/Client';

  this.data = new Data(db, 'CLIENT', this.schema);
}

Client.prototype = new Entity();

module.exports = Client;
