'use strict';

var Entity = require('./entity.js');
var Data = require('./data.js');

function Vendor (db) {
  this.db = db;
  Entity.apply(this, Array.prototype.slice.call(arguments));

  // Add more properties to the entity schema
  this.schema.id = '/Vendor';

  this.data = new Data(db, 'VENDOR', this.schema);
}

Vendor.prototype = new Entity();

module.exports = Vendor;
