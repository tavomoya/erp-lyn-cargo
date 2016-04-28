'use strict';

var app = angular.module('erpLynCargoApp');
app.controller('QuoteCtrl', function($scope, $state, Quotation, clients, currencies, loadingPorts, dischargePorts, items, toaster) {

	$scope.activeTab = 1;

	$scope.quote = new Quotation();
	$scope.client = clients.data;
	$scope.currency = currencies.data;
	$scope.loadingPort = loadingPorts.data;
	$scope.dischargePort = dischargePorts.data;
  $scope.item = items.data;

  $scope.quote.item = [{},{}];

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

  $scope.borrarItem = function (item) {
    var index = $scope.quote.item.indexOf(item);
    $scope.quote.item.splice(index, 1);
  }

    $scope.goBack = function () {

    }

});