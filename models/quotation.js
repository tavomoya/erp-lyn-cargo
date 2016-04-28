'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Quotation (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Quotation",
        "type": "object",
        "properties": {
            "client": {
                "type": "object",
                "required": true
            },
            "agentId": {
                "type": "number"
            },
            "transporterId": {
                "type": "number"
            },
            "shipmentType": {
                "type": "object"
            },
            "consignatorExporter": {
                "type": "string"
            },
            "status": {
                "type": "number"
            },
            "from": {
                "type": "string"
            },
            "to": {
                "type": "string",
                "required": true
            },
            "weight": {
                "type": "number"
            },
            "packagesQuantity": {
                "type": "number"
            },
            "volume": {
                "type": "number"
            },
            "merchDescription": {
                "type": "string"
            },
            "item": {
                "type": "object"
            },
            "price": {
                "type": "double",
            },
            "currency": {
                "type": "object",
                "required": true
            },
            "loadingPort": {
                "type": "object",
                "required": true
            },
            "dischargePort": {
                "type": "object",
                "required": true
            },
            "departureDate": {
                "type": "date",
                "required": true
            },
            "landingDate": {
                "type": "date",
                "required": true
            },
            "salesTerm": {
                "type": "string",
                "required": true
            }             
        }
    };

    this.data = new Data(db, 'QUOTATION', this.schema);
};

//This is a test function
Quotation.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Quotation;