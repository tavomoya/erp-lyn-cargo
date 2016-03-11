'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Util', function ($http, $q, $state) {

	var Util;

	
	function Util() {
		this.apiPath = "/util";
	}

	Util.prototype.getData = function (collection) {
		var deferred = $q.defer();
		var _this = this;
		$http.get(_this.apiPath + '/' + collection)
		.then(function(res) {
			deferred.resolve(res);
		}, function(err){
			console.log('Algo salio mal :/', err);
			deferred.reject(err);
		});

		return deferred.promise;
	};

	return Util;
});
