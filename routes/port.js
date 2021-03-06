var q = require('q');
var Port = require('../models/port');

module.exports = function (prefix, app) {
    //Test function
    app.get(prefix + '/test', function (req, res) {
        var port = new Port(app.db);
        port.test()
        .then(function (res){console.log('test worked', res)})
        .fail(function (err){console.log('did not worked :/')});
    });

    require('./data')(prefix, app, Port);
}