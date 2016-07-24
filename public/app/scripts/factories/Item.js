'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Item', function ($http, Data, $q, $state) {

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

	var Item;

	extend(Item, Data);

	function Item(propValues) {
		Item.super.constructor.apply(this, arguments);

		this.apiPath = "/item";
	}

	Item.properties = function () {
		var a = {};
		return a;
	};

	Item.prototype.save = function () {
		return Item.super.save.call(this);
	};

	Item.prototype.go = function (id) {
		$state.go('dashboard.item', {
			id: id
		});
	};

	return Item;
});
