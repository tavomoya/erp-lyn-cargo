'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Port (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Port",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "required": true
            },
            "country": {
                "type": "string",
                "required": true
            },
            "type": {
                "type": "string",
                "required": true
            }
        }
    };

    this.data = new Data(db, 'PORT', this.schema);
};

//This is a test function
Port.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Port;