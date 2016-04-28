'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('ItemTypeCtrl', function ($scope) {

	$scope.headers = [
		'Descripcion'
	];

	$scope.fields = [
		'description'
	];

});