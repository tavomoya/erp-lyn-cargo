'use strict';

var app = angular.module('erpLynCargoApp');

// Dynamic Crud - AccountType and ItemType
app.controller('TypeCtrl', function ($scope, content) {

	$scope.type = content._id ? content : angular.copy($scope.$parent.modelToUse);

	$scope.saveType = function (form) {
		if (form.$invalid) {
			return;
		};
		$scope.type.save()
		.then(function (res) {
			var _response = content._id ? res.data : res.data[0];
			$scope.closeThisDialog(_response);
		})
		.catch(function (err) {
			console.log('Mmmm hubo un maco', err);
		});
	};
	
	$scope.cancel = function () {
		$scope.closeThisDialog();
	}

});

// Dynamic Crud - Banks and Ports
app.controller('BanknPortCtrl', function ($scope, content, countries) {

	$scope.bp = content._id ? content : angular.copy($scope.$parent.modelToUse);
	$scope.countries = countries.data;
	$scope.types = [
		'Aeropuerto',
		'Puerto'
	];

	$scope.savebp = function (form) {
		if (form.$invalid) {
			return;
		};
		$scope.bp.save()
		.then(function (res) {
			var _response = content._id ? res.data : res.data[0];
			$scope.closeThisDialog(_response);
		})
		.catch(function (err) {
			console.log('Mmmm hubo un maco', err);
		});
	};
	
	$scope.cancel = function () {
		$scope.closeThisDialog();
	};

});