'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Vendor', function ($http, Data, $q, $state) {

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

	var Vendor;

	extend(Vendor, Data);

	function Vendor(propValues) {
		Vendor.super.constructor.apply(this, arguments);

		this.apiPath = "/vendor";
	}

	Vendor.properties = function () {
		var a = {};
		return a;
	};

	Vendor.prototype.save = function () {
		return Vendor.super.save.call(this);
	};

	Vendor.prototype.go = function (id) {
		$state.go('dashboard.vendor', {
			id: id
		});
	};

	return Vendor;
});
