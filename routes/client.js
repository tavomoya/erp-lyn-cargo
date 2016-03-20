var q = require('q');
var Client = require('../models/client');

module.exports = function (prefix, app) {


    require('./entity')(prefix, app, Client);
}
