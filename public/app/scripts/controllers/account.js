'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('AccountCtrl', function ($scope, $state, Account, currencies, accountTypes, banks, superAccounts, toaster) {
  
  $scope.account = new Account();
  $scope.currencies = currencies.data;
  $scope.accountTypes = accountTypes.data;
  $scope.banks = banks.data;
  $scope.superAccounts = superAccounts.data;
  //$scope.accountType = accountType.data;
  //console.log(accountType);

  $scope.saveAccount = function (form) {
    if (form.$invalid) {
      return;
    }
    $scope.account.save()
    .then(function (res) {
      $scope.bill = res.data[0];
      toaster.pop('success', 'Cuenta guardada', 'La Cuenta se ha guardado satisfactorimente');
    }, function (err) {
      console.log('No lo grabo :/ ', err);
      toaster.pop('error', 'Error', 'Ocurrio un error al tratar de guardar la factura');
    });
  };

  $scope.goBack = function () {

  }

});