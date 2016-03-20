'use strict';

var app = angular.module('erpLynCargoApp');
app.controller('ShipmentCtrl', function($scope, $state, Shipment, quotations, clients, currencies, agents, markets, loadingPorts, dischargePorts) {

	$scope.activeTab = 1;

	$scope.shipment = new Shipment();
	$scope.quotation = quotations.data;
	$scope.client = clients.data;
	$scope.currency = currencies.data;
	$scope.agent = agents.data;
	$scope.market = markets.data;
	$scope.loadingPort = loadingPorts.data;
	$scope.dischargePort = dischargePorts.data;

    $scope.saveShipment = function () {
      $scope.shipment.save()
      .then(function (res) {
        console.log('lo grabo!', res);
      }, function (err) {
        console.log('No lo grabo :/ ', err);
      });
    };

    $scope.goBack = function () {

    }

});