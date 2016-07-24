'use strict';

angular.module('erpLynCargoApp')
.controller('EmployeeListCtrl', function ($scope, Employee) {
  $scope.Employee = Employee;

  $scope.headers = [
    'Nombre',
    'Telefono',
    'Correo Electronico',
    'Posicion',
    'Direccion'
  ];

  $scope.fields = [
    'fullName',
    'phone',
    'email',
    'position',
    'address.description'
  ];
});
