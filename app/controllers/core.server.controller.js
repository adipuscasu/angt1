'use strict';

/**
 * Module dependencies.
 */
//exports.index = function(req, res) {
//	res.render('index', {
		//user: req.user || null,
		//request: req
	//});
//};
exports.index = function(req, res) {
	res.render('/firme', {
		user: req.user ,
		request: req
	});
};
