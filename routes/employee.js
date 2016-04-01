var q = require('q');
var Employee = require('../models/employee');

module.exports = function (prefix, app) {

    require('./entity')(prefix, app, Employee);
}
