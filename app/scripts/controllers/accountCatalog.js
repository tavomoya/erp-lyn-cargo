'use strict';

var app = angular.module('erpLynCargoApp');

app.controller('AccountCatalogCtrl', function ($scope) {
	$scope.accounts = [
		{
			name: 'Test Account',
			subAccounts: []
		},
		{
			name: 'Account Test with children',
			subAccounts: [
				{
					name: 'children 1',
					subAccounts: []
				},
				{
					name: 'children 2',
					subAccounts: [{name: 'children child', subAccounts: []}]
				}
			]
		}
	];

	$scope.displayOptions = {
    nodeChildren: "subAccounts",
    dirSelectable: true,
    injectClasses: {
      ul: "list-group",
      li: "list-group-item",
    }
	}
});