'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Util', function ($http, $q, $state) {

	function Util(propValues) {
		this.apiPath = '/util';
	}

	Util.prototype.getApiData = function (collection) {
		var deferred = $q.defer();

		$http.get(this.apiPath+ '/collection/'+collection)
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};

	Util.prototype.getAddressData = function () {
		var deferred = $q.defer();

		$http.get(this.apiPath + '/addressData')
		.then(function (res) {
			deferred.resolve(res);
		})
		.catch(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};

	return Util;
});
