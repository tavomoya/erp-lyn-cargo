'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Port', function ($http, Data, $q, $state) {

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

	var Port;

	extend(Port, Data);

	function Port(propValues) {
		Port.super.constructor.apply(this, arguments);

		this.apiPath = "/port";
	}

	Port.properties = function () {
		var a = {};
		return a;
	};

	Port.prototype.save = function () {
		return Port.super.save.call(this);
	};

	return Port;
});
