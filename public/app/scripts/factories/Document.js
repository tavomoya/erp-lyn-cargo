'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Document', function ($http, Data, $q, $state) {

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

	var Document;

	extend(Document, Data);

	function Document(propValues) {
		Document.super.constructor.apply(this, arguments);

		this.apiPath = "/document";
	}

	Document.properties = function () {
		var a = {};
		return a;
	};

	Document.prototype.save = function () {
		return Document.super.save.call(this);
	};

	return Document;
});
