'use strict';

var app = angular.module('erpLynCargoApp');

app.directive('cedula', function ($rootScope, toaster) {
	return {
		require : 'ngModel',
		restrict : 'A',
		link : function (scope, element, attrs) {
			element.blur(function () {
				if (element[0].value !== '') {
					var array = element[0].value.split('-'),
					cedula = array[0] + array[1],
					verificador = array[2],
					suma = 0,
					i;
					for (i = 0; i < cedula.length; i++) {
						var multiplicador = 0;

						if ((i % 2) === 0) {
							multiplicador = 1;
						} else {
							multiplicador = 2;
						}
						var resultado = cedula.substr(i, 1) * multiplicador;
						if (resultado > 9) {
							resultado = resultado.toString();
							resultado = parseInt(resultado.substr(0, 1)) + parseInt(resultado.substr(1, 1));
						}
						suma += parseInt(resultado);
					}

					if ((10 - (suma % 10)) % 10 === parseInt(verificador) && array[0] !== "000") {
						scope.valid = true;
					} else {
						scope.$apply(function () {
							element.focus();
							toaster.pop('error','','Se ha ingresado una cedula invalida, favor corregirla.', 2000);
							scope.valid = false;
						});
					}
				}
			});
		}
	};
});