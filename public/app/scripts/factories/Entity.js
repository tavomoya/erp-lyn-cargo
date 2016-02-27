'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Entity', function ($http, Data, $q, $state) {

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

	var Entity;

	extend(Entity, Data);

	function Entity(propValues) {
		Entity.super.constructor.apply(this, arguments);

		this.apiPath = "/entity";
	}

	Entity.properties = function () {
		var a = {};
		return a;
	};

	Entity.prototype.save = function () {
		return Entity.super.save.call(this);
	};

	return Entity;
});
