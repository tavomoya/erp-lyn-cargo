'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Quotation', function ($http, Data, $q, $state) {

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

	var Quotation;

	extend(Quotation, Data);

	function Quotation(propValues) {
		Quotation.super.constructor.apply(this, arguments);

		this.apiPath = "/quotation";
	}

	Quotation.properties = function () {
		var a = {};
		return a;
	};

	Quotation.prototype.save = function () {
		return Quotation.super.save.call(this);
	};

	return Quotation;
});
