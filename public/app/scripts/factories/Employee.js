'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Employee', function ($http, Data, $q, $state) {

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

	var Employee;

	extend(Employee, Data);

	function Employee(propValues) {
		Employee.super.constructor.apply(this, arguments);

		this.apiPath = "/employee";
	}

	Employee.properties = function () {
		var a = {};
		return a;
	};

	Employee.prototype.save = function () {
		return Employee.super.save.call(this);
	};

	Employee.prototype.go = function (id) {
		$state.go('dashboard.employee', {
			id: id
		});
	};

	return Employee;
});
