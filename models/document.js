'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Document (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Document",
        "type": "object",
        "properties": {
            "entity": {
                "type": "object",
                "required": true
            },
            "status": {
                "type": "number",
                "required": false
            },
            "shipmentId": {
                "type": "number",
                "required": false
            },
            "date": {
                "type": "date",
                "required": false
            },
            "price": {
                "type": "double",
                "required": false
            },
            "creditDays": {
                "type": "number",
                "required": false
            },
            "account": {
                "type": "object",
                "required": true
            },
            "entryDate": {
                "type": "date",
                "required": true
            },
            "dueDate": {
                "type": "date",
                "required": true
            },
            "paymentMethod": {
                "type": "object",
                "required": true
            },
            "condition": {
                "type": "object",
                "required": true
            },

        }
    };

    this.data = new Data(db, 'DOCUMENT', this.schema);
};

//This is a test function
Document.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Document;