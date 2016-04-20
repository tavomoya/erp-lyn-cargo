'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('PortCtrl', function ($scope) {

	$scope.headers = [
		'Nombre',
    'Pais',
    'Tipo'
	];

	$scope.fields = [
		'name',
    'country',
    'type'
	];

});