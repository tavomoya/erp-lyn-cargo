'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('AgentCtrl', function ($scope, currencies) {

	$scope.currencies = currencies.data;

	$scope.goBack = function () {
		history.back();
	}

});