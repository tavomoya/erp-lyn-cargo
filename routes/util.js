var q = require('q');
var util = require('../models/util');

module.exports = function (prefix, app) {

    app.get(prefix + '/collection/:collection', function (req, res) {
        util.getApiData(app.db, req.params.collection)
        .then(util.success(res))
        .fail(util.error(res));
    });

    app.get(prefix + '/addressData', function (req, res) {
      util.getAddressData(app.db)
      .then(util.success(res))
      .fail(util.error(res));
    });

    require('./data')(prefix, app, util);
};