'use strict';

angular.module('erpLynCargoApp')
.controller('ClientListCtrl', function ($scope, Client) {
  $scope.Client = Client;

  $scope.headers = [
    'Nombre',
    'Tipo',
    'Telefono',
    'Correo Electronico'
  ];

  $scope.fields = [
    'fullName',
    'type',
    'phone',
    'email'
  ];
});
