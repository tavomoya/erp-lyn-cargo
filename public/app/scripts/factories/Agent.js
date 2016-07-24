'use strict';

var app = angular.module('erpLynCargoApp');

app.factory('Agent', function ($http, Data, $q, $state) {

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

	var Agent;

	extend(Agent, Data);

	function Agent(propValues) {
		Agent.super.constructor.apply(this, arguments);

		this.apiPath = "/agent";
	}

	Agent.properties = function () {
		var a = {};
		return a;
	};

	Agent.prototype.save = function () {
		return Agent.super.save.call(this);
	};

	Agent.prototype.go = function (id) {
		$state.go('dashboard.agemt', {
			id: id
		});
	};

	return Agent;
});
