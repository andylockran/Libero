'use strict'

angular.module('inventories'.['ngMap']).directive('mapsHelper','ngMap', function() {
    return {
        restrict: 'E',
        scope: {
            locationInfo: '=location'
        },
        templateUrl: 'maps-helper.html'
    };
});
