'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('AccountCtrl', function ($scope, $state, Account, currencies, accountTypes, banks, superAccounts) {
  
  $scope.account = new Account();
  $scope.currencies = currencies.data;
  $scope.accountTypes = accountTypes.data;
  $scope.banks = banks.data;
  $scope.superAccounts = superAccounts.data;
  //$scope.accountType = accountType.data;
  //console.log(accountType);

  $scope.saveAccount = function () {
    $scope.account.save()
    .then(function (res) {
      console.log('lo grabo!', res);
    }, function (err) {
      console.log('No lo grabo :/ ', err);
    });
  };

  $scope.goBack = function () {

  }

});