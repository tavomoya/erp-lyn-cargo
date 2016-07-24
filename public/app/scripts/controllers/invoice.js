'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('InvoiceCtrl', function ($scope, $state, Document, clients, accounts, paymentMethods, conditions, toaster, items) {
  
  $scope.invoice = new Document();
  $scope.invoice.documentType = 1;
  $scope.clients = clients;
  $scope.accounts = accounts;
  $scope.paymentMethods = paymentMethods.data;
  $scope.conditions = conditions.data;
  $scope.items = items;
  $scope.invoice.detail = [
    {
      taxAmount: 0,
      taxEnable: false
    },
    {
      taxAmount: 0,
      taxEnable: false
    }, 
    {
      taxAmount: 0,
      taxEnable: false
    }];
    
    $scope.invoice.entryDate = new Date(); // The Entry Date should be the actual date

  $scope.saveInvoice = function (form) {
    if (form.$invalid) {
      return;
    };
    
    for (var i = $scope.invoice.detail.length - 1; i >= 0; i--) {
      if (!$scope.invoice.detail[i].item) {
        $scope.invoice.detail.splice(i, 1);
      }
    }
    $scope.invoice.save()
    .then(function (res) {
      toaster.pop('success', 'Factura guardada', 'La factura se ha guardado satisfactorimente');
    }, function (err) {
      console.log('No lo grabo :/ ', err);
      toaster.pop('error', 'Error', 'Ocurrio un error al tratar de guardar la factura');
    });
  };
  
  $scope.$watch('invoice.detail', function (a) {
    $scope.invoice.amount = $scope.invoice.detail.reduce(function (prev, act) {
      prev += act.item ? act.amount : 0;
      return prev;
    }, 0);
  }, true);

  $scope.goBack = function () {
    history.back();
  };
  
  $scope.setTax = function (taxEnable, index) {
    if (taxEnable) {
      $scope.invoice.detail[index].taxAmount = $scope.invoice.detail[index].item.price * 0.18;
    } else {
      $scope.invoice.detail[index].taxAmount = 0;
    };
  };
  
  $scope.removeRow = function (index) {
    $scope.invoice.detail.splice(index, 1);
  };
  
  $scope.addRow = function () {
    $scope.invoice.detail.push({
      taxAmount: 0,
      taxEnable: false
    });
  };

});