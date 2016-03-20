'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('InvoiceCtrl', function ($scope, $state, Document, clients, accounts, paymentMethods, conditions) {
  
  $scope.invoice = new Document();
  $scope.clients = clients.data;
  $scope.accounts = accounts.data;
  $scope.paymentMethods = paymentMethods.data;
  $scope.conditions = conditions.data
  //console.log(paymentMethodss);

  $scope.saveInvoice = function () {
    $scope.invoice.save()
    .then(function (res) {
      console.log('lo grabo!', res);
    }, function (err) {
      console.log('No lo grabo :/ ', err);
    });
  };

  $scope.goBack = function () {

  }

});