(function() {
    'use strict';

    angular
        .module('frontend')
        .service('dataService', dataService);

    /** @ngInject */
    function dataService($http, $q, $log, $timeout, $location, $rootScope) {

        // var serialize = function(obj, prefix) {
        //   var str = [];
        //   for(var p in obj) {
        //     if (obj.hasOwnProperty(p)) {
        //       var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        //       str.push(typeof v == "object" ?
        //         serialize(v, k) :
        //         encodeURIComponent(k) + "=" + encodeURIComponent(v));
        //     }
        //   }
        //   return str.join("&");
        // }

        return {
            // User Data
            getData: function(times, days){

                var deferred = $q.defer();

                var queryStr = 'https://3zstizfpne.execute-api.us-west-2.amazonaws.com/prod/records?start=' + times.start + '&end=' + times.end + '&days=' + days;

                // Uncomment for testing
                // $http.get('app/components/dataServices/data.json')
                $http.get(queryStr) // comment out for testing

                .then(function(data) {
                    deferred.resolve(data);
                }).catch(function(error) {
                    $log.error(error);
                    deferred.resolve(null);
                });

                return deferred.promise;
            }
        };
    }
})();