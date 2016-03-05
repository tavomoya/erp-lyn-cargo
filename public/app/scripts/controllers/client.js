'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('ClientCtrl', function ($scope, countries, provincias, sectores, currencies) {

	$scope.countries = countries.data;
	$scope.provincias = provincias.data;
	$scope.sectores = sectores.data;
	$scope.currencies = currencies.data;

	$scope.goBack = function () {
		history.back();
	}

});