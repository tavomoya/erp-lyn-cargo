'use strict';

angular.module('erpLynCargoApp')
  .filter('fullname', function () {
    return function (data) {
      if (data) {
        if (Array.isArray(data)) {
          return data.map(function (_data) {
            _data.fullName = '';
            if (_data.type === 'Persona') {
              _data.fullName = _data.firstName + ' ' + _data.lastName;
            } else {
              _data.fullName = _data.companyName;
            }
            return _data;
          });
        } else {
          return data.type === 'Persona' ?
              data.firstName + ' ' + data.lastName : data.companyName;
        }
      }
    }
  });
