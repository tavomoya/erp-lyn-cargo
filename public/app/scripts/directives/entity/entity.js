'use strict';

angular.module('erpLynCargoApp')
	.directive('entity', function(){
		return {
			templateUrl:'scripts/directives/entity/entity.html',
			restrict: 'E',
			scope: {
				ngModel: '=',
				type: '='	
			},
			controller: function ($scope) {
				$scope.entity = {};
				$scope.entityTypes = ['Persona', 'Empresa'];
				$scope.documentTypes = ['Cedula', 'Pasaporte'];
				$scope.entity.type = 'Persona';
				$scope.ngModel = $scope.entity;				
			}
		}
	});