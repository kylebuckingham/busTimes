(function() {
    'use strict';

    angular.module('customFilters', [])

    .filter('mn', function() {
        return function(input) {
            return Number(input.substring(0, input.length - 2));
        };
    })

    .filter('sizer', function() {
        return function(obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    size++;
                }
            }
            return size;
        };
    })

    .filter('getType', function() {
        return function(rdd) {
            if (rdd) {
                if (rdd.indexOf('ShardMapRDD') !== -1) {
                    return 'Shard Map';
                } else if (rdd.indexOf('MapRDD') !== -1) {
                    return 'Map';
                } else if (rdd.indexOf('ShardReduceRDD') !== -1) {
                    return 'Shard Reduce';
                } else if (rdd.indexOf('FilterRDD') !== -1) {
                    return 'Filter';
                } else if (rdd.indexOf('SliceRDD') !== -1) {
                    return 'SliceRDD';
                }
            } else {
                return 'Idle';
            }

        };
    })

    .filter('getDate', function() {
        return function(ms) {
            return (new Date(ms)).toString();
        };
    })

    .filter('bytesToMB', function() {
        return function(bytes) {
            return parseFloat(bytes / 1024 / 1024).toFixed(2);
        };
    })

    .filter('encode', function() {
        return function(str) {
            return encodeURIComponent(str);
        };
    })

    .filter('shortenStr', function() {
        return function(str, length) {
            return str.substring(0, length) + '...';
        };
    })

    .filter('isDuplicate', function() {
        return function(input, id) {
            var i;
            for (i in input) {
                if (input[i].id === id) {
                    return true;
                }
            }
            return false;
        };
    })

    .filter('millisToTime', function() {
        return function(num) {

            var times = {
                d: 86400000,
                h: 3600000,
                min: 60000,
                sec: 1000
            }, newDate = '';

            for (var t in times){
                if (num / times[t] >= 1){
                    var count = Math.floor(num / times[t]);
                    num = num - (count * times[t]);
                    newDate += count + t + ' ';
                }
            }

            return newDate;
        };
    })

    // Execution Server
    .filter('toArray', function() {
        return function(obj, addKey) {
            if (addKey === false) {
                return Object.keys(obj).map(function(key) {
                    return obj[key];
                });
            } else {
                return Object.keys(obj).map(function(key) {
                    if (typeof obj[key] === 'object') {
                        return Object.defineProperty(obj[key], '$key', {
                            enumerable: false,
                            value: key
                        });
                    }
                });
            }
        };
    })

    .filter('alphaNum', function() {
        return function(input) {
            return input.replace(/\W/g, '');
        };
    })

    .filter('secondsToTimeString', function() {
        return function(millseconds) {

            if (millseconds === '0') {
                return 'All Time';
            } else if (millseconds === '60') {
                return '1 min';
            } else if (millseconds === '600') {
                return '10 min';
            } else if (millseconds === '3600') {
                return '1 hour';
            }

        };
    })

    .filter('unique', function() {
        return function (arr, field) {
            return _.uniq(arr, function(a) { return a[field]; });
        };
    });

})();