'use strict';

var q = require('q');
var Data = require('./data');

// Class constructor
function AccountEntry (db) {
    this.db = db;
    
    //Database Schema
    this.schema = {
        "id": "/AccountEntry",
        "type": "object",
        "properties": {
          "debit": {"type": "object"},
          "credit": {"type": "object"},
          "date": {"type": "date"} 
        }
    };

    this.data = new Data(db, 'ACCOUNTENTRY', this.schema);
};

// Save AccountEntry for invoice
AccountEntry.prototype.invoiceAccountEntries = function (_invoice) {
  var deferred = q.defer();
  var _this = this;
  var entryPromises = []; // All the entries will be in this array
  
  // The entry for the account
  // selected in the invoice 
  var creditEntry = {
    credit: {
      account: _invoice.account,
      amount: _invoice.amount
    },
    date: new Date(),
    invoiceID: _invoice._id
  };
  entryPromises.push(_this.data.insert(creditEntry));
  
  for (var i = 0; i < _invoice.detail.length; i++) {
    var debitEntry = {
      debit: {
        account: _invoice.detail[i].item.account,
        amount: _invoice.detail[i].amount
      },
      date: new Date(),
      invoiceID: _invoice._id
    };
    
    entryPromises.push(_this.data.insert(debitEntry));
  };
  
  
  q.all(entryPromises)
  .then(function (res) {
    deferred.resolve(res);
  })
  .fail(function (err) {
    deferred.reject({
      error: err,
      message: 'Error trying to save the entries'
    });
  });
  
  return deferred.promise;
  
};


//Save AccountEntry for Bills
AccountEntry.prototype.billAccountEntries = function (_bill) {
  var deferred = q.defer();
  var _this = this;
  var entryPromises = [];
  
  // The entry for the account
  // selected in the invoice 
  var debitEntry = {
    debit: {
      account: _bill.account,
      amount: _bill.amount
    },
    date: new Date(),
    billID: _bill._id
  };
  entryPromises.push(_this.data.insert(debitEntry));
  
  for (var i = 0; i < _bill.detail.length; i++) {
    var creditEntry = {
      credit: {
        account: _bill.detail[i].item.account,
        amount: _bill.detail[i].amount
      },
      date: new Date(),
      billID: _bill._id
    };
    
    entryPromises.push(_this.data.insert(creditEntry));
  };
  
  
  q.all(entryPromises)
  .then(function (res) {
    deferred.resolve(res);
  })
  .fail(function (err) {
    deferred.reject({
      error: err,
      message: 'Error trying to save the entries'
    });
  });
  
  return deferred.promise;
  
}


// Make the class visible
module.exports = AccountEntry;