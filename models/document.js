'use strict';

var q = require('q');
var Data = require('./data');
var AccountEntry = require('./accountEntry');

// Class constructor
function Document (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/Document",
        "type": "object",
        "properties": {
            "entity": {
                "type": "object"
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
            }
        }
    };

    this.data = new Data(db, 'DOCUMENT', this.schema);
    this.accountEntry = new AccountEntry(db);
};

Document.prototype.insert = function (_document) {
    var deferred = q.defer();
    var _this = this;
    
    this.data.insert(_document)
    .then(function (res) {
        return _this.accountEntry.invoiceAccountEntries(res[0]);
    })
    .then(function (obj) {
        deferred.resolve(obj);
    })
    .fail(function (err) {
        console.log(err);
        deferred.reject({
            error: err,
            message: 'There was an error saving the invoice'
        });
    });
    
    return deferred.promise;
};

// Make the class visible
module.exports = Document;