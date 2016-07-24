'use strict';

var app = angular.module('erpLynCargoApp');
app.controller('EmployeeCtrl', function($scope, addressData, currencies, Employee, toaster, $stateParams) {

	// Setting initial data
	$scope.activeTab = 1;
	$scope.countries = addressData.data.countries;
	$scope.provincias = addressData.data.provinces;
	$scope.sectores = addressData.data.municipalities;
	$scope.documentTypes = ['Cédula', 'Pasaporte'];
	$scope.currencies = currencies.data;
	$scope.employee = new Employee();
	$scope.employee.status = 1;
	$scope.employee.documentType = $scope.documentTypes[0];

	$scope.saveEmployee = function (form) {
		if (form.$invalid) {
			return;
		}
		$scope.employee.save()
		.then(function (res) {
			toaster.pop(
				'success',
				'',
				'El Empleado ha sido guardado satisfactoriamente.'
			);
		}, function (err) {
			console.log('Hubo un error', err);
			toaster.pop(
				'error',
				'',
				'Ocurrio un error al guardar el Empleado'
			);
		});
	};

	$scope.goBack = function () {
		history.back();
	};

	var fill = function (id) {
		$scope.employee.findById(id)
		.then(function (res) {
			console.log(res);
			if (res.data.birthDate) {
				res.data.birthDate = new Date(res.data.birthDate);
			};
			$scope.employee = angular.copy(res.data);
		})
		.catch(function (err) {
			console.log('Got an error', err);
		});
	};

	if ($stateParams.id) {
		fill($stateParams.id);
	};

});
