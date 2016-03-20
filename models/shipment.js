'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function Shipment (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Shipment",
        "type": "object",
        "properties": {
            "quotation": {
                "type": "object"
            },
            "client": {
                "type": "object",
                "required": true
            },
            "agent": {
                "type": "object",
                "required": true
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
                "type": "string",
                "required": true
            },
            "to": {
                "type": "string"
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
            "startDate": {
                "type": "date",
                "required": true
            },
            "endDate": {
                "type": "date",
                "required": true
            },
            "currency": {
                "type": "object",
                "required": true
            },
            "market": {
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
            "shipName": {
                "type": "string",
                "required": true
            },
            "trip": {
                "type": "string",
                "required": true
            },
            "departureDate": {
                "type": "date",
                "required": true
            },
            "landingDate": {
                "type": "date",
                "required": true
            }
        }
    };

    this.data = new Data(db, 'SHIPMENT', this.schema);
};

//This is a test function
Shipment.prototype.test = function () {
    var deferred = q.defer();
    deferred.resolve(':)');
    return deferred.promise;
}

// Make the class visible
module.exports = Shipment;