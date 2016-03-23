'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('BillCtrl', function ($scope, $state, Document, providers, accounts, paymentMethods, conditions, toaster) {
  
  $scope.bill = new Document();
  $scope.providers = providers.data;
  $scope.accounts = accounts.data;
  $scope.paymentMethods = paymentMethods.data;
  $scope.conditions = conditions.data
  //console.log(paymentMethodss);

  $scope.saveBill = function (form) {
    if (form.$invalid) {
      return;
    }
    $scope.bill.save()
    .then(function (res) {
      $scope.bill = res.data[0];
      toaster.pop('success', 'Factura guardada', 'La factura se ha guardado satisfactorimente');
    }, function (err) {
      console.log('No lo grabo :/ ', err);
      toaster.pop('error', 'Error', 'Ocurrio un error al tratar de guardar la factura');
    });
  };

  $scope.goBack = function () {

  }

});