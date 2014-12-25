'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	firme = require('../../app/controllers/firme.server.controller');

module.exports = function(app) {
	// Firme Routes
	app.route('/firme')
		.get(users.requiresLogin, firme.list)
		.post(users.requiresLogin, firme.create);

	app.route('/firme/:firmaId')
		.get(users.requiresLogin, firme.read)
		.put(users.requiresLogin, firme.hasAuthorization, firme.update)
		.delete(users.requiresLogin, firme.hasAuthorization, firme.delete);

	// Finish by binding the firma middleware
	app.param('firmaId', firme.firmaByID);
};