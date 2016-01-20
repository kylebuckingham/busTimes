(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, dataService, NgMap, $modal, $filter) {

        var mapData, vm = this;
        $scope.mapData = [];
        $scope.lateness = 0;

        $scope.$on('mapInitialized', function (event, map) {
            $scope.busTimesMap = map;
        });

        // Multi-select params
        $scope.selectedRoutes = [];
        $scope.routes = [];
        $scope.routesIds = [];
        $scope.mOptions = {
            enableSearch: true,
            scrollable: true,
            scrollableHeight: '500px'
        }
        $scope.mTexts = {
            buttonDefaultText: 'Select Route(s)'
        }


        function getData(){

            $scope.loading = true;
            dataService.getData($scope.times, $scope.day).then(function(data){
                $scope.loading = false;
                $scope.data = data.data;

                // Process points
                for (var point in $scope.data){
                    if ($scope.routesIds.indexOf($scope.data[point].routeid) === -1){
                        $scope.routesIds.push($scope.data[point].routeid);
                    }
                }

                // process routes
                $scope.routes = [];
                for (var i in $scope.routesIds){
                    $scope.routes.push({
                        id: $scope.routesIds[i],
                        label: $scope.routesIds[i]
                    });
                }
                processData();
            });
        }

        function processData(){

            $scope.mapData = [];

            for (var point in $scope.data){
                var weight = parseInt($scope.data[point].stopdeviationinseconds);

                if ($scope.lateness < (weight / 60)){

                    // if point in route ids
                    for (var i in $scope.selectedRoutes){
                        if ($scope.selectedRoutes[i].id === $scope.data[point].routeid){
                            $scope.mapData.push({
                                location: new google.maps.LatLng($scope.data[point].lat, $scope.data[point].lon),
                                weight: weight / 60,
                                lat: $scope.data[point].lat,
                                lon: $scope.data[point].lon,
                                id: $scope.data[point].routeid
                            });
                        }
                    }
                }
            }

            vm.ready = true;
        }

        $scope.$watch('selectedRoutes', function(newVal, oldVal) {
            if (newVal !== oldVal){
                processData();
            }
        }, true);

        $scope.compute = function(){
            var start = parseInt($scope.times.start.match(/\d+/))
            var end = parseInt($scope.times.end.match(/\d+/))

            // convert to military time
            if ($scope.times.start.indexOf('pm') != -1){
                start += 12;
            }
            if ($scope.times.end.indexOf('pm') != -1){
                end += 12;
            }

            if (start > end){
                $scope.badTime = true;
            } else {
                $scope.badTime = false;
                getData();
            }
        }

        $scope.$watch('lateness', function(newVal, oldVal) {
            if (newVal !== oldVal){
                processData();
            }
        });

        $scope.$watch('heat', function(newVal) {
            if (newVal === false){
                $scope.busTimesMap.heatmapLayers.foo.setMap(null);
            }
        });

        // map marker popups
        $scope.showInfoWindow = function (event, p) {
            var infowindow = new google.maps.InfoWindow();
            var center = new google.maps.LatLng(p.lat,p.lon);
            infowindow.setContent('<div><span><b>Route:  </b>' + p.id + '</span><br/>' + '<span><b>Late(median):</b>  ' + $filter('millisToTime')(p.weight * 60 * 1000) + '</span><br/>' + '<span><b>Lat/Lon:</b>  ' + p.lat + ' ' + p.lon + '</span><br/></div>');
            infowindow.setPosition(center);
            infowindow.open($scope.busTimesMap);
         };

        $scope.changeOptions = function() {
            var addOptionsModal = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/main/main.options.html',
                controller: 'optionsCtrl',
                size: 'lg'
            });

            addOptionsModal.result.then(function(options) {
                $scope.day = options.day;
                $scope.times = options.times;
                getData();
            });
        };

        $scope.changeOptions();

    }
})();
