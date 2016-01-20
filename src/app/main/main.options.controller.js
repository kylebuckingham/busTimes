(function() {
    'use strict';

    angular
        .module('frontend')
        .controller('optionsCtrl', optionsCtrl);

    /** @ngInject */
    function optionsCtrl($scope, $q, $modalInstance, $filter) {

        // days of week button
        $scope.days = ["Weekdays", "Weekends","Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday", "Saturday"];
        $scope.day = "Weekdays";

        $scope.possibleTimes = ['12 am', '1 am','2 am','3 am','4 am','5 am','6 am','7 am','8 am','9 am','10 am','11 am','12 pm','1 pm','2 pm','3 pm','4 pm','5 pm','6 pm','7 pm','8 pm','9 pm','10 pm','11 pm']
        $scope.times = {
            start: '6 am',
            end: '9 am'
        }

        // Submit settings
        $scope.ok = function () {
            $modalInstance.close({
            	day: $scope.day,
            	times: $scope.times
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();




