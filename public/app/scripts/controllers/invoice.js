'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('InvoiceCtrl', function ($scope, $state, Document, clients, accounts, paymentMethods, conditions, toaster) {
  
  $scope.invoice = new Document();
  $scope.clients = clients.data;
  $scope.accounts = accounts.data;
  $scope.paymentMethods = paymentMethods.data;
  $scope.conditions = conditions.data
  //console.log(paymentMethodss);

  $scope.saveInvoice = function (form) {
    if (form.$invalid) {
      return;
    }
    $scope.invoice.save()
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