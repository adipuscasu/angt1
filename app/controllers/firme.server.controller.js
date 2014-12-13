'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Firma = mongoose.model('Firma'),
	_ = require('lodash');

/**
 * Create a firma
 */
exports.create = function(req, res) {
	var firma = new Firma(req.body);
	firma.user = req.user;

	firma.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(firma);
		}
	});
};

/**
 * Show the current firma
 */
exports.read = function(req, res) {
	res.json(req.firma);
};

/**
 * Update a firma
 */
exports.update = function(req, res) {
	var firma = req.firma;

	firma = _.extend(firma, req.body);

	firma.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(firma);
		}
	});
};

//
// Sterge firma
//
exports.delete = function(req, res) {
	var firma = req.firma;

	firma.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(firma);
		}
	});
};

//
// List of Firmas
//
exports.list = function(req, res) {
	Firma.find().sort('-created').populate('user', 'displayName').exec(function(err, firme) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(firmas);
		}
	});
};

/**
 * Firma middleware
 */
exports.firmaByID = function(req, res, next, id) {
	Firma.findById(id).populate('user', 'displayName').exec(function(err, firma) {
		if (err) return next(err);
		if (!firma) return next(new Error('Failed to load firma ' + id));
		req.firma = firma;
		next();
	});
};

/**
 * Firma authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.firma.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};