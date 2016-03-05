'use strict';

angular.module('erpLynCargoApp')
	.directive('entity', function(){
		return {
			templateUrl:'scripts/directives/entity/entity.html',
			restrict: 'E',
			scope: {
				ngModel: '=',
				type: '=',
				countries: '=',
				provincias: '=',
				sectores: '=',
				currencies: '='
			},
			controller: function ($scope, Entity, toaster) {
				$scope.entity = new Entity();
				$scope.entityTypes = ['Persona', 'Empresa'];
				$scope.documentTypes = ['Cedula', 'Pasaporte'];
				$scope.entity.type = 'Persona';
				$scope.entity.status = 1;
				$scope.ngModel = $scope.entity;	

				$scope.saveEntity = function () {
					$scope.entity.save()
					.then(function (res) {
						$scope.saved = true;
						toaster.pop(
							'success', 
							$scope.type + ' Guardado', 
							'El '+$scope.type+' ha sido guardado satisfactoriamente.'
						);
					}, function (err) {
						console.log('I got an error :/', err);
						toaster.pop(
							'error',
							'Error!',
							'Ocurrio un error al guardar el '+$scope.type
						);
					})
				};
		
			}
		}
	});