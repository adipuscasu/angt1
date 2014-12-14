'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Firma Schema
 */
var FirmaSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
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
