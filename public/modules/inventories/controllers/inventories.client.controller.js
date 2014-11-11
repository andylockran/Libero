'use strict';

// Inventories controller
angular.module('inventories').controller('InventoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Inventories', 'Categories','geolocation',
	function($scope, $stateParams, $location, Authentication, Inventories, Categories, geolocation ) {
		$scope.authentication = Authentication;
		$scope.categories = Categories.query();


		var getmylocation = function () {
			geolocation.getLocation()
				.then(function(data) {
					$scope.location = data.coords.latitude + ',' + data.coords.longitude;
				},
				function(err) {
					console.log('error', err);
				});
		};

		$scope.location = getmylocation();

		// Create new Inventory
		$scope.create = function() {
			// Create new Inventory object

			var inventory = new Inventories ({
				name: this.name,
				category: this.category._id,
				description: this.description,
				location: $scope.location
				
			});

			// Redirect after save
			inventory.$save(function(response) {
				$location.path('inventories/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.category = '';
				$scope.description = '';
				$scope.location = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Inventory
		$scope.remove = function( inventory ) {
			if ( inventory ) { inventory.$remove();

				for (var i in $scope.inventories ) {
					if ($scope.inventories [i] === inventory ) {
						$scope.inventories.splice(i, 1);
					}
				}
			} else {
				$scope.inventory.$remove(function() {
					$location.path('inventories');
				});
			}
		};

		// Update existing Inventory
		$scope.update = function() {

			var inventory = $scope.inventory;
			inventory.location = $scope.location;

			inventory.$update(function() {
				$location.path('inventories/' + inventory._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Inventories
		$scope.find = function() {
			$scope.inventories = Inventories.query();
		};

		// Find existing Inventory
		$scope.findOne = function() {
			$scope.inventory = Inventories.get({ 
				inventoryId: $stateParams.inventoryId
			})
		};
	}
]);
