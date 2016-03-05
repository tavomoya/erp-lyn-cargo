'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Entity (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Entity",
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string",
                "required": false
            },
            "lastName": {
                "type": "string",
                "required": false
            },
            "companyName": {
                "type": "string",
                "required": false
            },
            "identificationCode": {
                "type": "number"
            },
            "rnc": {
                "type": "string"
            },
            "address": {
                "type": "object",
                "required": true
            },
            "phone": {
                "type": "string",
                "required": true
            },
            "status": {
                "type": "number",
                "required": true
            },
            "email": {
                "type": "string",
                "required": true
            },
            "representative": {
                "type": "string"
            },
            "hiredDate": {
                "type": "date"
            },
            "leavingDate": {
                "type": "date"
            },
            "payrollId": {
                "type": "number"
            },
        }
    };

    this.data = new Data(db, 'ENTITY', this.schema);
};

//This is a test function
Entity.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Entity;