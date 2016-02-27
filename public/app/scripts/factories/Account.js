'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Account', function ($http, Data, $q, $state) {

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

	var Account;

	extend(Account, Data);

	function Account(propValues) {
		Account.super.constructor.apply(this, arguments);

		this.apiPath = "/account";
	}

	Account.properties = function () {
		var a = {};
		return a;
	};

	Account.prototype.save = function () {
		return Account.super.save.call(this);
	};

	return Account;
});
