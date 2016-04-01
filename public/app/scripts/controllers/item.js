'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('ItemCtrl', function ($scope, $state, Item, itemTypes, toaster) {
  
  $scope.item = new Item();
  $scope.itemTypes = itemTypes.data;

  $scope.saveItem = function (form) {
    if (form.$invalid) {
      return;
    }
    $scope.item.save()
    .then(function (res) {
      $scope.item = res.data[0];
      toaster.pop('success', 'Item Guardado', 'El Item se ha guardado satisfactorimente');
    }, function (err) {
      console.log('No lo grabo :/ ', err);
      toaster.pop('error', 'Error', 'Ocurrio un error al tratar de guardar el item');
    });
  };

  $scope.goBack = function () {

  }

});
