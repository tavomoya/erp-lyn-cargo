'use strict';

var q = require('q');
var key = require('../keys');
var converter = require('currency-converter')({CLIENTKEY: key})
var cron = require('cron').CronJob;
var Rate = require('rates.do');

// Class constructor
function Job (db) {
    this.db = db;
};

//Job to get Dollar's rate
Job.prototype.dollarsToPesos = function () {
    var _this = this;
    var collection = _this.db.collection('RATE');
    var rates = new Rate();

    var _job = new cron('0 0 0 * * *',
    function () {
        var startDate = new Date();
        console.log('[*] Cron job started');
        console.log('[*] dollarsToPesos');
        console.log('[*] A las: ' + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds());
        console.log('[*] El dia: ' + startDate.getDate() + "/" + (parseInt(startDate.getMonth()) + 1) + "/" + startDate.getFullYear());

        rates.getRatesFromAllBanks()
        .then(function (_rates) {
          collection.insert({
            from: 'USD',
            to: 'DOP',
            date: new Date(),
            rate: _rates.dollar_mean.selling_rate
          }, function (err, r) {
            if (err) {
              console.log('There was an error saving the rate');
            };

            return;
          });
        })

    }, null, true);
    _job.start();
};

//Job to get Euro's rate
Job.prototype.euroToPesos = function () {
    var _this = this;
    var collection = _this.db.collection('RATE');
    var rates = new Rate();

    var _job = new cron('0 0 0 * * *',
    function () {
        var startDate = new Date();
        console.log('[*] Cron job started');
        console.log('[*] euroToPesos');
        console.log('[*] A las: ' + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds());
        console.log('[*] El dia: ' + startDate.getDate() + "/" + (parseInt(startDate.getMonth()) + 1) + "/" + startDate.getFullYear());

        rates.getRatesFromAllBanks()
        .then(function (_rates) {
          collection.insert({
            from: 'EUR',
            to: 'DOP',
            date: new Date(),
            rate: _rates.euro_mean.selling_rate
          }, function (err, r) {
            if (err) {
              console.log('There was an error saving the rate');
            };

            return;
          });
        })

    }, null, true);
    _job.start();
};


// Make the class visible
module.exports = Job;
