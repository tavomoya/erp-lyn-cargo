'use strict';

var app = angular.module('erpLynCargoApp');
app.controller('ShipmentCtrl', function($scope, $state, Shipment, quotations, clients, currencies, agents, markets, loadingPorts, dischargePorts, toaster) {

	$scope.activeTab = 1;

	$scope.shipment = new Shipment();
	$scope.quotation = quotations.data;
	$scope.client = clients.data;
	$scope.currency = currencies.data;
	$scope.agent = agents.data;
	$scope.market = markets.data;
	$scope.loadingPort = loadingPorts.data;
	$scope.dischargePort = dischargePorts.data;

    $scope.saveShipment = function (form) {
      if (form.$invalid) {
      return;
    }
      $scope.shipment.save()
      .then(function (res) {
        $scope.shipment = res.data[0];
        toaster.pop('success', 'Expediente guardado', 'El expediente se ha guardado satisfactorimente');
      }, function (err) {
        console.log('No lo grabo :/ ', err);
        toaster.pop('error', 'Error', 'Ocurrio un error al tratar de guardar la factura');
      });
    };

    $scope.goBack = function () {

    }

});