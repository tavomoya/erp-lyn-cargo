var q = require('q');

module.exports = function (prefix, app, Entity) {

    require('./data')(prefix, app, Entity);
}
