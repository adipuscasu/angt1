'use strict';

// Setting up route
angular.module('firme').config(['$stateProvider',
	function($stateProvider) {
		// Firme state routing
		$stateProvider.
		state('firme-selectate', {
			url: '/firme-selectate',
			templateUrl: 'modules/firme/views/firme-selectate.client.view.html'
		}).
		state('firme-selectate', {
			url: '/firme-selectate',
			templateUrl: 'modules/firme/views/firme-selectate.client.view.html'
		}).
		state('listFirme', {
			url: '/firme',
			templateUrl: 'modules/firme/views/list-firme.client.view.html'
		}).
		state('createFirme', {
			url: '/firme/create',
			templateUrl: 'modules/firme/views/create-firma.client.view.html'
		}).
		state('viewFirma', {
			url: '/firme/:firmaId',
			templateUrl: 'modules/firme/views/view-firma.client.view.html'
		}).
		state('editFirma', {
			url: '/firme/:firmaId/edit',
			templateUrl: 'modules/firme/views/edit-firma.client.view.html'
		});
	}
]);
