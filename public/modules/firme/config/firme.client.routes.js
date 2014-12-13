'use strict';

// Setting up route
angular.module('firme').config(['$stateProvider',
	function($stateProvider) {
		// Firme state routing
		$stateProvider.
		state('listFirme', {
			url: '/firme',
			templateUrl: 'modules/firme/views/list-firme.client.view.html'
		}).
		state('createFirme', {
			url: '/firme/create',
			templateUrl: 'modules/firme/views/create-article.client.view.html'
		}).
		state('viewFirme', {
			url: '/firme/:articleId',
			templateUrl: 'modules/firme/views/view-article.client.view.html'
		}).
		state('editFirme', {
			url: '/firme/:articleId/edit',
			templateUrl: 'modules/firme/views/edit-article.client.view.html'
		});
	}
]);