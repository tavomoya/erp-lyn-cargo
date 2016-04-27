'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('AccountTypeCtrl', function ($scope) {

	$scope.headers = [
		'Descripcion'
	];

	$scope.fields = [
		'description'
	];

});