'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('AccountType', function ($http, Data, $q, $state) {

	var hasProp = Object.prototype.hasOwnProperty;
	var extend = function (child, parent) {
		for (var key in parent) {
			if (hasProp.call(parent, key))
				child[key] = parent[key];
		}

		function ctor() {
			this.constructor = child;
		}

		ctor.prototype = parent.prototype;

		child.prototype = new ctor;

		child.super = parent.prototype;

		return child;
	};

	var AccountType;

	extend(AccountType, Data);

	function AccountType(propValues) {
		AccountType.super.constructor.apply(this, arguments);

		this.apiPath = "/accountType";
	};

	AccountType.properties = function () {
		var a = {};
		return a;
	};

	AccountType.prototype.save = function () {
		return AccountType.super.save.call(this);
	};

	return AccountType;
});
