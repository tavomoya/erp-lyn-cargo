'use strict';

angular.module('erpLynCargoApp')
  .filter('fulladdress', function () {
    return function (obj) {
      return obj ? obj.description + ', ' + obj.sector.nombre + ' ' + obj.province.nombre : '';
    };
  });