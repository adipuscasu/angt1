'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./../errors.server.controller'),
	User = mongoose.model('User'),
	_ = require('lodash');


//create controller
exports.create = function(req, res, next) {
 var user = new User(req.body);
	// Add missing user fields
	user.provider = 'local';
	user.displayName = req.firstName + ' ' + req.lastName;

 // Then save the user 
 user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

exports.create2 = function(req, res) {
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	// Then save the user 
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data
			user.password = undefined;
			user.salt = undefined;
		}
	});
};
