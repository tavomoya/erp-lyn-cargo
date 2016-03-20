'use strict';

var app = angular.module('erpLynCargoApp');
app.controller('QuoteCtrl', function($scope, $state, Quotation, clients, currencies, loadingPorts, dischargePorts) {

	$scope.activeTab = 1;

	$scope.quote = new Quotation();
	$scope.client = clients.data;
	$scope.currency = currencies.data;
	$scope.loadingPort = loadingPorts.data;
	$scope.dischargePort = dischargePorts.data;

    $scope.saveQuote = function () {
      $scope.quote.save()
      .then(function (res) {
        console.log('lo grabo!', res);
      }, function (err) {
        console.log('No lo grabo :/ ', err);
      });
    };

    $scope.goBack = function () {

    }

});