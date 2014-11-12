'use strict';

// Inventories controller
angular.module('inventories').controller('InventoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Inventories', 'Categories','geolocation',
	function($scope, $stateParams, $location, Authentication, Inventories, Categories, geolocation ) {
		$scope.authentication = Authentication;
		$scope.categories = Categories.query();

		var getmylocation = function () {
			return geolocation.getLocation()
				.then(function(data) {
					$scope.location = data.coords;
				},
				function(err) {
					console.log('error', err);
				});
		};

		$scope.location = getmylocation();

		$scope.$on('mapInitialized', function(event, map) {
			geolocation.getLocation()
				.then(function(data) {
					var topleftlat = data.coords.latitude + 0.01;
					var topleftlong = data.coords.longitude - 0.01;
					var bottomrightlat = data.coords.latitude - 0.01;
					var bottomrightlong = data.coords.longitude + 0.01;

			//var topleftlat = ($scope.location.latitude + 0.0001);
			//console.log(topleftlat);
					var lat = data.coords.latitude;
					var long = data.coords.longitude;
					var centreMap = new google.maps.LatLng(lat,long);
					/*var bounds = new google.maps.LatLngBounds(
						//new google.maps.LatLng($scope.location.latitude+);
						new google.maps.LatLng(topleftlat,topleftlong),
						new google.maps.LatLng(bottomrightlat,bottomrightlong)
					);

					// Define a rectangle and set its editable property to true.
					var rectangle = new google.maps.Rectangle({
						bounds: bounds,
						editable: true
					});
*/
					var circle = new google.maps.Circle({
						strokeColor: '#FF0000',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: '#FF0000',
						fillOpacity: 0.35,
						map: map,
						center: centreMap,
						radius:1000,
						editable: true
					});
					circle.setMap(map);
					//rectangle.setMap(map);
					google.maps.event.addListener(circle, 'center_changed', function() {
						$scope.location = circle.getCentre();
					})
				});
		});

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
			inventory.location = $scope.location.latitude,$scope.location.longitude;

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
			});
		};
	}
]);
