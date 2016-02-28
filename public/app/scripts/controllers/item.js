'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('ItemCtrl', function ($scope, $state, Item, itemTypes) {

  $scope.item = new Item();
  $scope.itemTypes = itemTypes.data;

  $scope.saveItem = function () {
    $scope.item.save()
    .then(function (res) {
      console.log('lo grabo!', res);
    }, function (err) {
      console.log('No lo grabo :/ ', err);
    });
  };

  $scope.goBack = function () {

  }

});
