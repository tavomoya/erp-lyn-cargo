'use strict';

angular.module('erpLynCargoApp')
	.directive('entity', function(){
		return {
			templateUrl:'scripts/directives/entity/entity.html',
			restrict: 'E',
			scope: {
				ngModel: '=',
				type: '=',
				currencies: '='
			},
			controller: function ($scope, toaster, Util, Client, Vendor, Agent) {
				// Initial Data
				$scope.entity = ($scope.type === 'Cliente') ? new Client() :
						($scope.type === 'Proveedor') ? new Vendor() : new Agent();
				$scope.entityTypes = ['Persona', 'Empresa'];
				$scope.documentTypes = ['Cédula', 'Pasaporte'];
				$scope.entity.documentType = $scope.documentTypes[0];
				$scope.entity.type = 'Persona';
				$scope.entity.status = 1;
				$scope.ngModel = $scope.entity;
				new Util().getAddressData()
				.then(function (res) {
					$scope.countries = res.data.countries;
					$scope.provincias = res.data.provinces;
					$scope.sectores = res.data.municipalities;
				}, function (err) {
					console.log('Ooh la muerte', err);
				});

				$scope.saveEntity = function (form) {
					if (form.$invalid) {
						return;
					};
					$scope.entity.save()
					.then(function (res) {
						$scope.saved = true;
						toaster.pop(
							'success',
							'',
							'El '+$scope.type+' ha sido guardado satisfactoriamente.'
						);
					}, function (err) {
						console.log('I got an error :/', err);
						toaster.pop(
							'error',
							'',
							'Ocurrio un error al guardar el '+$scope.type
						);
					})
				};

			}
		}
	});
