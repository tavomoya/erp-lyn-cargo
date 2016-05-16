'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('BillCtrl', function ($scope, $state, Document, providers, accounts, paymentMethods, conditions, toaster, items) {
  
  $scope.bill = new Document();
  $scope.bill.documentType = 2;
  $scope.providers = providers;
  $scope.accounts = accounts;
  $scope.paymentMethods = paymentMethods.data;
  $scope.conditions = conditions.data;
  $scope.items = items;
  $scope.bill.detail = [
    {
      taxAmount: 0
    },
    {
      taxAmount: 0
    },
    {
      taxAmount: 0
    }
  ];
  //For the radiobutton
  $scope.bill.includeTax = 'no';

  $scope.saveBill = function (form) {
    //Validate the form
    if (form.$invalid) {
      return;
    };
    
    //Remove whitespaces
    for (var i = $scope.bill.detail.length - 1; i >= 0; i--) {
      if (!$scope.bill.detail[i].item) {
        $scope.bill.detail.splice(i, 1);
      }
    };
    
    $scope.bill.save()
    .then(function (res) {
      // $scope.bill = res.data[0];
      toaster.pop('success', 'Factura guardada', 'La factura se ha guardado satisfactorimente');
    }, function (err) {
      console.log('No lo grabo :/ ', err);
      toaster.pop('error', 'Error', 'Ocurrio un error al tratar de guardar la factura');
    });
  };

  $scope.goBack = function () {
    history.back();
  };
  
  $scope.$watch('bill.detail', function (a) {
    $scope.bill.amount = $scope.bill.detail.reduce(function (prev, act) {
      prev += act.item ? act.amount : 0;
      return prev;
    }, 0);
  }, true);
  
  $scope.removeRow = function (index) {
    $scope.bill.detail.splice(index, 1);
  };
  
  $scope.addRow = function () {
    $scope.bill.detail.push({});
  };
  
  $scope.setTax = function (decision) {
    if (decision) {
      $scope.bill.detail
      .forEach(function (elem) {
        if (elem.item) {
          elem.taxAmount = elem.item.price * 0.18;                
        } else {
          return;
        };
      });
    } else {
      $scope.bill.detail
      .forEach(function (elem) {
        elem.taxAmount = 0;        
      });
    };
  };

});