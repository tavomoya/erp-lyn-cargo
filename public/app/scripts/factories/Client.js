'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Client', function ($http, Data, $q, $state) {

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

	var Client;

	extend(Client, Data);

	function Client(propValues) {
		Client.super.constructor.apply(this, arguments);

		this.apiPath = "/client";
	}

	Client.properties = function () {
		var a = {};
		return a;
	};

	Client.prototype.save = function () {
		return Client.super.save.call(this);
	};

	return Client;
});
