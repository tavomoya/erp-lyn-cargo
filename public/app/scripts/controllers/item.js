'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('ItemCtrl', function ($scope, $state, Item, itemTypes, toaster, accounts, $stateParams) {

  $scope.item = new Item();
  $scope.itemTypes = itemTypes;
  $scope.accounts = accounts;

  $scope.saveItem = function (form) {
    if (form.$invalid) {
      return;
    }
    $scope.item.save()
    .then(function (res) {
      $scope.item = res.data[0];
      toaster.pop('success', 'Item Guardado', 'El Item se ha guardado satisfactorimente');
    }, function (err) {
      console.log('No lo grabo :/ ', err);
      toaster.pop('error', 'Error', 'Ocurrio un error al tratar de guardar el item');
    });
  };

  $scope.goBack = function () {
    history.back();
  };

  var fill = function (id) {
		$scope.item.findById(id)
		.then(function (res) {
			$scope.item = angular.copy(res.data);
		})
		.catch(function (err) {
			console.log('Got an error', err);
		});
	};

	if ($stateParams.id) {
		fill($stateParams.id);
	};

});
