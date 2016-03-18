'use strict';

var Entity = require('./entity.js');
var Data = require('./data.js');

function Employee (db) {
  this.db = db;
  Entity.apply(this, Array.prototype.slice.call(arguments));

  // Add more properties to the entity schema
  this.schema.id = '/Employee';

  this.data = new Data(db, 'EMPLOYEE', this.schema);
}

Employee.prototype = new Entity();

module.exports = Employee;
