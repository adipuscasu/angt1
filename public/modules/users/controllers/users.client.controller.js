'use strict';

angular.module('users').controller('UsersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users',
	function($scope, $stateParams, $location, Authentication, Users) {
		$scope.authentication = Authentication;

		$scope.adauga = function() {
			var user = new Users({
				firstName: this.firstName,
				lastName: this.lastName,
				displayName: this.displayName,
				email: this.email,
				username: this.username,
				password: this.password
			});
			user.$save(function(response) {
				$location.path('users/add' + response._id);

				$scope.firstName = '';
				$scope.lastName = '';
				$scope.displayName = '';
				$scope.email = '';
				$scope.username = '';
				$scope.password = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(user) {
			if (user) {
				user.$remove();

				for (var i in $scope.users) {
					if ($scope.users[i] === user) {
						$scope.users.splice(i, 1);
					}
				}
			} else {
				$scope.user.$remove(function() {
					$location.path('users');
				});
			}
		};

		$scope.update = function() {
			var user = $scope.user;

			user.$update(function() {
				$location.path('users/' + user._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.users = Users.query();
		};

		$scope.findOne = function() {
			$scope.user = Users.get({
				userId: $stateParams.userId
			});
		};
	}
]);