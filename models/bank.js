'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Bank (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Bank",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "required": true
            }
        }
    };

    this.data = new Data(db, 'BANK', this.schema);
};

//This is a test function
Bank.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Bank;