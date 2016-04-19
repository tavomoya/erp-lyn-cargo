'use strict';

var q = require('q');
var JsonSchema = require('jsonschema').Validator;
var ObjectID = require('mongodb').ObjectID;

// Class constructor

function Data (db, collection, schema) {
	this.db = db;
	this.collection = db.collection(collection);
	this.schema = schema;
};

// Private functions

function handleResponse (deferred, message) {
	return function (err, data) {
		if (err) {
			deferred.reject(err);
		};

		if (!data) {
			deferred.reject({
				error: new Error('There was an unknown error. Check server'),
				message: ''
			});
		} else {
			// Temporary workaround 
			data = typeof data === 'number' ? {data: data, status: 200} : data;
			deferred.resolve(data);
		};
	};
};

function validateSchema (deferred, object, schema) {
	if (!schema) {
		throw new Error ('Schema is not defined');
	};

	var validated = new JsonSchema().validate(object, schema);

	if (validated.errors.length > 0) {
		deferred.reject(validated.errors);
	} else {
		return true
	};
	return false;
};

function dateParser (object) {
	for (var key in object) {

		if (/date/.test(key.toLowerCase())) {
			if (typeof object[key] !== 'object') {
				object[key] = new Date(object[key]);
			} else {
				for(var innerKey in object[key]) {
					if (/$/.test(key2.toLowerCase())) {
						object[key][innerKey] = new Date(object[key][innerKey]);
					}
				}
			}
		} else if (Array.isArray(object[key])) {
			for (var o in object[key]){
				object[key][o] = dateParser(object[key][o]);
			}
		}
	};
	return object;
};

// Public functions

Data.prototype.find = function(query, options) {
	var deferred = q.defer();
	var query = (typeof query === 'string') ? JSON.parse(query) : query;
	
	// If you need to filter by many fields
	if (options.search && options.fields) {
		query.$or = [];
		options.fields.forEach(function (elem) {
			var _field = {};
			if (isNaN(options.search)) {
				_field[elem] = {
					$regex: options.search,
					$options: 'i'
				}
			} else {
				_field[elem] = parseFloat(options.search);
			};
			
			query.$or.push(_field);
		});
	}
	
	var fnToUse = (options) ? 
		this.collection.find(query).skip(options.skip).limit(options.limit)
			: this.collection.find(query);

	fnToUse
	.toArray(handleResponse(deferred));

	return deferred.promise;
};

Data.prototype.findById = function(id) {
	var deferred = q.defer();
	var query = {
		_id: new ObjectID(id)
	};

	this.collection.findOne(query, {},
		handleResponse(deferred));

	return deferred.promise;
};

Data.prototype.insert = function (object) {

	var deferred = q.defer();
	var _this = this;
	object = dateParser(object);
	// object.createdDate = new Date();

	if (validateSchema(deferred, object, _this.schema)) {
		_this.collection.insert(object,
			handleResponse(deferred))
	};

	return deferred.promise;
};

Data.prototype.update = function(query, updObject, options) {
	updObject = dateParser(updObject);
	var deferred = q.defer();
	var _options = (!options) ? {} : options;
	
	if (typeof query._id === 'string') {
		query._id = new ObjectID(query._id);
	};
	delete updObject._id; // Deleting the _id of the object since this can throw an exception
	
	this.collection.update(query, updObject, _options,
		handleResponse(deferred));

	return deferred.promise;
};

Data.prototype.delete = function(query) {
	var deferred = q.defer();

	this.collection.deleteOne(query,
		handleResponse(deferred));

	return deferred.promise;
};

Data.prototype.count = function(query, options) {
	var deferred = q.defer();
	var query = (!query) ? {} : query;
	
	// If you need to filter by many fields
	if (options.search && options.fields) {
		query.$or = [];
		options.fields.forEach(function (elem) {
			var _field = {};
			if (isNaN(options.search)) {
				_field[elem] = {
					$regex: options.search,
					$options: 'i'
				}
			} else {
				_field[elem] = parseFloat(options.search);
			};
			
			query.$or.push(_field);
		});
	};

	this.collection.count(query, {},
		handleResponse(deferred));

	return deferred.promise;
};

// Make the class visible
module.exports = Data;
