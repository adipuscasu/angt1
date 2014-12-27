'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Firma Schema
 */

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return (property.length>2);
};


var FirmaSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Numele firmei nu poate fi vid !',
		validate: [validateLocalStrategyProperty, 'Numele firmei este prea scurt !']
	},
        cod_fiscal: {
		type: String,
		default: '',
		trim: true,
		required: 'Codul de identificare fiscala este obligatoriu'
	},
        nr_reg_com: {
		type: String,
		default: '',
		trim: true
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Firma', FirmaSchema);
