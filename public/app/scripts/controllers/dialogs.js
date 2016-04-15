'use strict';

var app = angular.module('erpLynCargoApp');

// Dynamic Crud - AccountType and ItemType
app.controller('TypeCtrl', function ($scope, content) {

	$scope.type = angular.copy($scope.$parent.modelToUse);

	$scope.saveType = function (form) {
		if (form.$invalid) {
			return;
		};

		$scope.type.save()
		.then(function (res) {
			$scope.closeThisDialog(res.data[0]);
		})
		.catch(function (err) {
			console.log('Mmmm hubo un maco', err);
		});
	}

});

// Dynamic Crud - Banks and Ports
app.controller('BanknPortCtrl', function ($scope) {

});