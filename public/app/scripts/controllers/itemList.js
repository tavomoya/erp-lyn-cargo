'use strict';

angular.module('erpLynCargoApp')
.controller('ItemListCtrl', function ($scope, Item) {
  $scope.Item = Item;

  $scope.headers = [
    'Codigo',
    'name',
    'Precio'
  ];

  $scope.fields = [
    'code',
    'name',
    'price'
  ];
});
