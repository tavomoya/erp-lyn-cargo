var q = require('q');
var Agent = require('../models/agent');

module.exports = function (prefix, app) {

    require('./entity')(prefix, app, Agent);
}
