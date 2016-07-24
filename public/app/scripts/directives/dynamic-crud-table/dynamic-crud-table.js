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
			controller: function ($scope, AccountType, ItemType, Port, ngDialog, toaster, Bank) {

				$scope.content = [];
				$scope.totalPages = 0;
				$scope.currentPage = 1;
				$scope.params = {
					limit: 10,
					skip: 0,
					search: '',
					fields: $scope.fields
				};

				$scope.modelToUse = $scope.model === 'AccountType' ? new AccountType()
					: $scope.model === 'ItemType' ? new ItemType()
						: $scope.model === 'Bank' ? new Bank()
							: new Port();

				$scope.getContent = function (params) {

					$scope.modelToUse.find({}, params)
					.then(function (res) {
						$scope.content = res;
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
								content: function () {
									return {};
								}
							}
						})
						.closePromise.then(function (res) {
							if (res.value._id) {
								$scope.content.push(res.value)
								toaster.pop('success', $scope.title + ' Guardado', 'El '+ $scope.title+ ' se ha guardado satisfactorimente');
							};
						});
					} else {
						ngDialog.open({
							template: 'views/dialogs/banknPorts.html',
							controller: 'BanknPortCtrl',
							scope: $scope,
							resolve: {
								content: function () {
									return {};
								},
								countries: function (Util) {
									return new Util().getApiData('COUNTRY');
								}
							}
						})
						.closePromise.then(function (res) {
							if (res.value._id) {
								$scope.content.push(res.value)
								toaster.pop('success', $scope.title + ' Guardado', 'El '+ $scope.title+ ' se ha guardado satisfactorimente');
							};
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
								content: function () {
									return _content;
								}
							}
						})
						.closePromise.then(function (res) {
							if (typeof res.value === 'object')
								toaster.pop('success', $scope.title + ' Actualizado', 'El '+ $scope.title+ ' se ha actualizado satisfactorimente');
						});
					} else {
						ngDialog.open({
							template: 'views/dialogs/banknPorts.html',
							controller: 'BanknPortCtrl',
							scope: $scope,
							resolve: {
								content: function () {
									return _content;
								},
								countries: function (Util) {
									return new Util().getApiData('COUNTRY');
								}
							}
						})
						.closePromise.then(function (res) {
							if (typeof res.value === 'object')
								toaster.pop('success', $scope.title + ' Actualizado', 'El '+ $scope.title+ ' se ha actualizado satisfactorimente');
						});
					}
				};

				$scope.prevPageDisabled = function () {
					return $scope.currentPage === 1 ? "disabled" : "";
				};

				$scope.nextPageDisabled = function () {
					return $scope.currentPage === $scope.totalPages ? "disabled" : "";
				};

				$scope.prevPage = function () {
					if ($scope.currentPage > 1) {
						$scope.currentPage--;
						$scope.params.skip = (($scope.currentPage - 1) * $scope.params.limit);
						$scope.getContent($scope.params);
					}
				};

				$scope.nextPage = function () {
					if ($scope.currentPage < $scope.totalPages) {
						$scope.currentPage++;
						$scope.params.skip = (($scope.currentPage - 1) * $scope.params.limit);
						$scope.getContent($scope.params);
					}
				};

				$scope.search = function (_string) {
					$scope.params.search = _string;
					$scope.modelToUse.count(null, $scope.params)
					.then(function (res) {
						var count = res.data.data;
						$scope.totalPages = count < $scope.params.limit ? 1 : Math.ceil(count / $scope.params.limit);
						$scope.getContent($scope.params);
					})
					.catch(function (err) {
						console.log('error', err);
					});
				};

				// On Load
				$scope.modelToUse.count()
				.then(function (res) {
					var count = res.data.data;
					$scope.totalPages = count < $scope.params.limit ? 1 : Math.ceil(count / $scope.params.limit);
					$scope.getContent($scope.params);
				})
				.catch(function (err) {
					console.log('error', err);
				});
			}
		}
	});
