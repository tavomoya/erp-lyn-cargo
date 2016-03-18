var q = require('q');
var Vendor = require('../models/vendor');

module.exports = function (prefix, app) {

    require('./entity')(prefix, app, Vendor);
}
