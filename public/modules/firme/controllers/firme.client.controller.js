'use strict';

angular.module('firme').controller('FirmeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Firme',
	function($scope, $stateParams, $location, Authentication, Firme) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var firma = new Firme({
				title: this.title,
				content: this.content
			});
			firma.$save(function(response) {
				$location.path('firme/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(firma) {
			if (firma) {
				firma.$remove();

				for (var i in $scope.firme) {
					if ($scope.firme[i] === firma) {
						$scope.firme.splice(i, 1);
					}
				}
			} else {
				$scope.firma.$remove(function() {
					$location.path('firme');
				});
			}
		};

		$scope.update = function() {
			var firma = $scope.firma;

			firma.$update(function() {
				$location.path('firme/' + firma._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.firme = Firme.query();
		};

		$scope.findOne = function() {
			$scope.firma = Firme.get({
				firmaId: $stateParams.firmaId
			});
		};
	}
]);