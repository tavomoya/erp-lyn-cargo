'use strict';

angular.module('erpLynCargoApp')
.controller('QuotationListCtrl', function ($scope, Quotation) {
  $scope.Quotation = Quotation;

  $scope.headers = [
    'Nombre',
    'Telefono',
    'Correo Electronico',
    'Posicion'
  ];

  $scope.fields = [
    'fullName',
    'phone',
    'email',
    'Position'
  ];
});
