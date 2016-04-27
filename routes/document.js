var q = require('q');
var Document = require('../models/document');
var Util = require('../models/util');

module.exports = function (prefix, app) {
    
    app.post(prefix, function (req, res) {
        var _doc = new Document(app.db);
        _doc.insert(req.body.obj)
        .then(Util.success(res))
        .fail(Util.error(res));
    });

    require('./data')(prefix, app, Document);
}