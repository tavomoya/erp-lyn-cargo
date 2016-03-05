'use strict';

var q = require('q');

exports.success = function (res) {
	return function (f) {
		res.send(200, f);
	};
};

exports.error = function (res) {
	return function (f) {
		res.send(510, f);
	};
};

exports.getApiData = function (db, collection) {
	var deferred = q.defer();
	var _collection = db.collection(collection);

	_collection.find({})
	.toArray(function (err, data) {
		if (err) {
			deferred.reject({
				error: err,
				message: 'Ocurrio un error trayendo la data'
			});
		};

		if (!data) {
			deferred.reject({
				error: new Error('Ocurrio un error trayendo la data')
			});
		} else {
			deferred.resolve(data);
		};
	});

	return deferred.promise;
}