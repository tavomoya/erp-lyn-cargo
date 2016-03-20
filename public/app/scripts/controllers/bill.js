'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('BillCtrl', function ($scope, $state, Document, providers, accounts, paymentMethods, conditions) {
  
  $scope.bill = new Document();
  $scope.providers = providers.data;
  $scope.accounts = accounts.data;
  $scope.paymentMethods = paymentMethods.data;
  $scope.conditions = conditions.data
  //console.log(paymentMethodss);

  $scope.saveBill = function () {
    $scope.bill.save()
    .then(function (res) {
      console.log('lo grabo!', res);
    }, function (err) {
      console.log('No lo grabo :/ ', err);
    });
  };

  $scope.goBack = function () {

  }

});