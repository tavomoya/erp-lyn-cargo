'use strict';

var app = angular.module('erpLynCargoApp');
app.controller('EmployeeCtrl', function($scope, Account) {

	$scope.activeTab = 1;
	new Account().find()
	.then(function (res) {
		console.log('reses', res);
	}, function (error) {
		console.log('error', error);
	})

});
