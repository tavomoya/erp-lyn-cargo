'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('VendorCtrl', function ($scope, currencies) {

	$scope.currencies = currencies.data;

	$scope.goBack = function () {
		history.back();
	}

});