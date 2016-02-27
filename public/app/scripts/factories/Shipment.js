'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Shipment', function ($http, Data, $q, $state) {

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

	var Shipment;

	extend(Shipment, Data);

	function Shipment(propValues) {
		Shipment.super.constructor.apply(this, arguments);

		this.apiPath = "/shipment";
	}

	Shipment.properties = function () {
		var a = {};
		return a;
	};

	Shipment.prototype.save = function () {
		return Shipment.super.save.call(this);
	};

	return Shipment;
});
