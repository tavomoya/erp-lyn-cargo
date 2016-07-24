'use script';

var app = angular.module('erpLynCargoApp');

app.factory('Data', function ($http, $q, $rootScope) {

	// Class constructor
	var Data = function (data) {
		// Shouldn't instantiate this
		if (this.constructor.name === 'Data') {
			throw new Error("This class can't be instantiated -__-");
		}

		this.assignProperties(data);
	};

	// Helper
	Data.prototype.getData = function (object) {
		if (object === null || object === undefined) {
			object = this;
		};

		return object;
	};

	/*
		This function is used to find all
		or an especific object in the
		specified collection.
		function params:
			*params type 'object'
	*/
	Data.prototype.find = function(query, options) {
		var deferred = $q.defer();
		var _this = this.constructor;

		if (!query) {
			query = {};
		};

		$http.post(this.apiPath + '/find',
		{
			obj: query,
			opts: options
		})
		.then(function (res) {
			var _res;
			if (Array.isArray(res.data)) {
				_res = res.data.map(function (obj) {
					return new _this(obj);
				});
			} else {
				_res = new _this(res);
			};

			deferred.resolve(_res);
 		}, function (err) {
 			deferred.reject(err);
 		});

		return deferred.promise;
	};

	/*
		This function is used to find
		an especific object by ID
		in the specified collection.
		function params:
			*id type ObjectID
	*/
	Data.prototype.findById = function(id) {
		var deferred = $q.defer();
		var _this = this;
		var _constructor = _this.constructor;


		if (!id) {
			deferred.reject({error: 'Debe mandar un id'});
		} else {
			$http.get(_this.apiPath + '/find/' + id)
			.then(function (res) {
				var _res;

				if (Array.isArray(res)) {
					_res = res.map(function (obj) {
						return new _constructor(obj);
					});
				} else {
					_res = new _constructor(res);
				};

				deferred.resolve(_res);
			}, function (err) {
				deferred.reject(err);
			})
		}

		return deferred.promise;
	};

	/*
		This function is used to insert
		or update an object in the
		specified collection.
		function params:
			*object type 'object'
	*/
	Data.prototype.save = function(object) {
		var deferred = $q.defer();
		var _this = this;
		var _constructor = _this.constructor;
		if (!object) {
			object = _this.getData();
		}

		if (!_this._id) {
			$http.post(_this.apiPath, {obj: object})
			.then(function (res) {
				if (Array.isArray(res.data)) {
					res.data = res.data.map(function (obj) {
						return new _constructor(obj);
					});
				} else {
					res = new _constructor(res);
				};
				deferred.resolve(res);
			}, function (err) {
				deferred.reject(err);
			});
		} else {
			var query = {_id: _this._id};
			$http.put(_this.apiPath, {
				qry: query,
				obj: object}
			)
			.then(function (res) {
				deferred.resolve(res);
			}, function (err) {
				deferred.reject(err);
			});
		}

		return deferred.promise;
	};

	/*
		This function is used to update
		an especific object in the
		specified collection.
		function params:
			*query type 'object',
			*object type 'object',
			*opts type 'opts'
	*/
	Data.prototype.update = function(query, object, opts) {
		var deferred = $q.defer();
		var _this = this;

		if (!opts) {
			opts = {};
		};

		$http.put(_this.apiPath, {
			qry: query,
			obj: object,
			opts: opts
		})
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	Data.prototype.delete = function(query) {
		var deferred = $q.defer();
		var _this = this;

		if (!query) {
			query = {_id: _this._id};
		};

		$http.delete(_this.apiPath, {obj: query})
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	Data.prototype.count = function(query, opts) {
		var deferred = $q.defer();
		var _this = this;

		if (!query) {
			query = {};
		};
		if (!opts) {
			opts = {};
		};

		$http.post(_this.apiPath + '/count', {
			obj: query,
			opts: opts
		})
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	Data.prototype.assignProperties = function (data) {

		//~~ Variables
		var _this = this;

		//~~ Functions

		//Look for the property value
		var getPropertyValue = function (_defaultValue, _value) {

			//Check if this property should be an instance of another class
			if (_defaultValue != null && typeof _defaultValue === "function") {

				//Check if it is just an insance or an array of instances
				if (Array.isArray(_value)) {
					return _value.map(function (obj) {
						return new _defaultValue(obj);
					});
				} else {
					return new defaultValue(_value);
				}

				//If it is not an instance just assign everything
			} else {
				return _value;
			}
		};

		//~~ Business Logic
		if (data == null) {
			data = {};
		}

		var properties = this.constructor.properties();

		//Look for each property in the class
		for (var key in data) {

			//Get default value / constructor
			var defaultValue = properties[key];

			_this[key] = getPropertyValue(defaultValue, data[key]);

			if (Array.isArray(data[key])){
				var _key = key;

				//Look for each element in the array
				for (var i in data[_key]){

					//Look for each property of the object
					for (var key in data[_key][i]){

						var defaultValue = properties[key];

						_this[_key][i][key] = getPropertyValue(defaultValue, data[_key][i][key]);
					}
				}
			}
		};

		// return the incoming data in case some other function wants to play with it next
		return data;
	};

	return Data;

});
