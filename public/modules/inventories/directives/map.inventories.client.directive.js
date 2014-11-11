'use strict'

angular.module('inventories'. []).directive('mapsHelper', function() {
    return {
        restrict: 'E',
        scope: {
            locationInfo: '=location'
        },
        templateUrl: 'maps-helper.html'
    };
});
