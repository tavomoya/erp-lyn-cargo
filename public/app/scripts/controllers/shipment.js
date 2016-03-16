'use strict';

var app = angular.module('erpLynCargoApp');
app.controller('ShipmentCtrl', function($scope, $state, quotations, clients, currencies, agents, markets, loadingPorts, dischargePorts) {

	$scope.activeTab = 1;

	$scope.quotation = quotations.data;
	$scope.client = clients.data;
	$scope.currency = currencies.data;
	$scope.agent = agents.data;
	$scope.market = markets.data;
	$scope.loadingPort = loadingPorts.data;
	$scope.dischargePort = dischargePorts.data;

});