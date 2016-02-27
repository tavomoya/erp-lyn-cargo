'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Payroll', function ($http, Data, $q, $state) {

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

	var Payroll;

	extend(Payroll, Data);

	function Payroll(propValues) {
		Payroll.super.constructor.apply(this, arguments);

		this.apiPath = "/payroll";
	}

	Payroll.properties = function () {
		var a = {};
		return a;
	};

	Payroll.prototype.save = function () {
		return Payroll.super.save.call(this);
	};

	return Payroll;
});
