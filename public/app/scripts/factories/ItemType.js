'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('ItemType', function ($http, Data, $q, $state) {

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

	var ItemType;

	extend(ItemType, Data);

	function ItemType(propValues) {
		ItemType.super.constructor.apply(this, arguments);

		this.apiPath = "/itemType";
	}

	ItemType.properties = function () {
		var a = {};
		return a;
	};

	ItemType.prototype.save = function () {
		return ItemType.super.save.call(this);
	};

	return ItemType;
});
