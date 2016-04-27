'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Bank', function ($http, Data, $q, $state) {

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

	var Bank;

	extend(Bank, Data);

	function Bank(propValues) {
		Bank.super.constructor.apply(this, arguments);

		this.apiPath = "/bank";
	}

	Bank.properties = function () {
		var a = {};
		return a;
	};

	Bank.prototype.save = function () {
		return Bank.super.save.call(this);
	};

	return Bank;
});
