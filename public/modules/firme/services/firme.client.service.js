'use strict';

//Firme service used for communicating with the firme REST endpoints
angular.module('firme').factory('Firme', ['$resource',
	function($resource) {
		return $resource('firme/:firmaId', {
			firmaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);