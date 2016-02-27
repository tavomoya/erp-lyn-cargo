'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('ShipmentType', function ($http, Data, $q, $state) {

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

	var ShipmentType;

	extend(ShipmentType, Data);

	function ShipmentType(propValues) {
		ShipmentType.super.constructor.apply(this, arguments);

		this.apiPath = "/shipmentType";
	}

	ShipmentType.properties = function () {
		var a = {};
		return a;
	};

	ShipmentType.prototype.save = function () {
		return ShipmentType.super.save.call(this);
	};

	return ShipmentType;
});
