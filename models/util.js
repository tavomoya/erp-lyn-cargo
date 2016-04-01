'use strict';

/*
	In this file you can see functions that you may use/need
	made thinking of some common use cases.

	PS: if you think there's a function that could be here
	don't hesitate and just add it. :)
*/
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

exports.getApiData = function(db, collection){
	var deferred = q.defer();

	var _collection = db.collection(collection);
	_collection.find({})
	.toArray(function(err, data){
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
};

exports.getAddressData = function (db) {
	var deferred = q.defer();
	var addressData = {};
	// Collections to use
	var countryCollection = db.collection('COUNTRY');
	var provinceCollection = db.collection('PROVINCIA');
	var municipalitiesCollection = db.collection('MUNICIPIO');
	countryCollection.find({}, {"name.common": 1, "cioc": 1})
	.toArray(function (err, _countries) {
		if (err) {
			console.log(err);
			deferred.reject({
				error: err,
				message: 'Failed to get countries data'
			});
		};

		if (!_countries) {
			deferred.reject({
				error: err,
				message: 'Unexpected error on countries'
			});
		} else {
			addressData['countries'] = _countries;
			provinceCollection.find({}, {nombre: 1, id: 1})
			.toArray(function (error, _provinces) {
				if (error) {
					deferred.reject({
						error: error,
						message: 'Failed to get countries data'
					});
				};

				if (!_provinces) {
					deferred.reject({
						error: err,
						message: 'Unexpected error on provinces'
					});
				} else {
					addressData['provinces'] = _provinces;
					municipalitiesCollection.find({}, {nombre: 1, id: 1, provincia_id: 1})
					.toArray(function (e, _municipalities) {
						if (e) {
							deferred.reject({
								error: err,
								message: 'Failed to get countries data'
							});
						};

						if (!_municipalities) {
							deferred.reject({
								error: err,
								message: 'Unexpected error on municipalities'
							});
						} else {
							addressData['municipalities'] = _municipalities;
							deferred.resolve(addressData);
						};
					});
				};
			});
		};
	});
	return deferred.promise;
};