'use strict';

angular.module('erpLynCargoApp')
	.directive('dynamicCrudTable', function () {
		return {
			templateUrl: 'scripts/directives/dynamic-crud-table/dynamic-crud-table.html',
			restrict: 'E',
			scope: {
				ngModel: '=',
				fields: '=',
				model: '=',
				title: '=',
				headers: '='
			},
			controller: function ($scope, AccountType, ItemType, ShipmentType, ngDialog, toaster) {

				$scope.content = [];

				$scope.modelToUse = $scope.model === 'AccountType' ? new AccountType()
					: $scope.model === 'ItemType' ? new ItemType()
						: new ShipmentType();

				$scope.getContent = function () {
					$scope.modelToUse.find()
					.then(function (res) {
						$scope.content = res.data;
					})
					.catch(function (err) {
						console.log('There was an error fetching content', err);
					});
				};

				$scope.createNew = function () {
					if ($scope.model === 'AccountType' ||
						$scope.model === 'ItemType') {
						ngDialog.open({
							template: 'views/dialogs/types.html',
							controller: 'TypeCtrl',
							scope: $scope,
							resolve: {
								content: {};
							}
						})
						.closePromise.then(function (res) {
							$scope.content.push(res.value)
							toaster.pop('success', $scope.title + ' Guardado', 'El '+ $scope.title+ ' se ha guardado satisfactorimente');
						});
					} else {
						ngDialog.open({
							template: 'views/dialogs/banknPorts.html'
						});
					}
				};

				$scope.editContent = function (_content) {
					if ($scope.model === 'AccountType' ||
						$scope.model === 'ItemType') {
						ngDialog.open({
							template: 'views/dialogs/types.html',
							controller: 'TypeCtrl',
							scope: $scope,
							resolve: {
								content: _content
							}
						})
						.closePromise.then(function (res) {
							$scope.content.push(res.value)
							toaster.pop('success', $scope.title + ' Guardado', 'El '+ $scope.title+ ' se ha guardado satisfactorimente');
						});
					} else {
						ngDialog.open({
							template: 'views/dialogs/banknPorts.html'
						});
					}
				}

				// On Load
				$scope.getContent();

			}
		}
	});