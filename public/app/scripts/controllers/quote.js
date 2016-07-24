'use strict';

var app = angular.module('erpLynCargoApp');
app.controller('QuoteCtrl', function($scope, $state, Quotation, clients, currencies, loadingPorts, dischargePorts, toaster) {

	$scope.activeTab = 1;

	$scope.quote = new Quotation();
	$scope.client = clients;
	$scope.currency = currencies.data;
	$scope.loadingPort = loadingPorts.data;
	$scope.dischargePort = dischargePorts.data;

    $scope.saveQuote = function (form) {
      if (form.$invalid) {
      return;
    }
      $scope.quote.save()
      .then(function (res) {
        $scope.quote = res.data[0];
        toaster.pop('success', 'Cotización guardada', 'La cotización se ha guardado satisfactorimente');
      }, function (err) {
        console.log('No lo grabo :/ ', err);
        toaster.pop('error', 'Error', 'Ocurrio un error al tratar de guardar la factura');
      });
    };

    $scope.goBack = function () {
			history.back();
    };

		var fill = function (id) {
			$scope.quote.findById(id)
			.then(function (res) {
				$scope.quote = angular.copy(res.data);
			})
			.catch(function (err) {
				console.log('Got an error', err);
			});
		};

		if ($stateParams.id) {
			fill($stateParams.id);
		};

});
