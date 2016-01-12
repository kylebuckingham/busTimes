!function(){"use strict";angular.module("frontend",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ngRoute","ui.bootstrap","ngMap","angularjs-dropdown-multiselect"])}(),function(){"use strict";function e(e,t,n,a,i,o){return{getData:function(a,i){var o=t.defer(),r="https://3zstizfpne.execute-api.us-west-2.amazonaws.com/prod/records?start="+a.start+"&end="+a.end+"&days="+i;return e.get(r).then(function(e){o.resolve(e)})["catch"](function(e){n.error(e),o.resolve(null)}),o.promise}}}e.$inject=["$http","$q","$log","$timeout","$location","$rootScope"],angular.module("frontend").service("dataService",e)}(),function(){"use strict";function e(e,t,n){function a(){e.loading=!0,t.getData(e.times,e.day).then(function(t){e.loading=!1,e.data=t.data;for(var n in e.data)-1===e.routesIds.indexOf(e.data[n].routeid)&&e.routesIds.push(e.data[n].routeid);e.routes=[];for(var a in e.routesIds)e.routes.push({id:e.routesIds[a],label:e.routesIds[a]});i()})}function i(){e.mapData=[];for(var t in e.data){var n=parseInt(e.data[t].stopdeviationinseconds);if(e.lateness<n/60)for(var a in e.selectedRoutes)e.selectedRoutes[a].id===e.data[t].routeid&&e.mapData.push({location:new google.maps.LatLng(e.data[t].lat,e.data[t].lon),weight:n/60,lat:e.data[t].lat,lon:e.data[t].lon,id:e.data[t].routeid})}o.ready=!0}var o=this;e.mapData=[],e.possibleTimes=["12 am","1 am","2 am","3 am","4 am","5 am","6 am","7 am","8 am","9 am","10 am","11 am","12 pm","1 pm","2 pm","3 pm","4 pm","5 pm","6 pm","7 pm","8 pm","9 pm","10 pm","11 pm"],e.times={start:"6 am",end:"9 am"},e.lateness=0,e.$on("mapInitialized",function(t,n){e.busTimesMap=n}),e.selectedRoutes=[],e.routes=[],e.routesIds=[],e.mOptions={enableSearch:!0,scrollable:!0,scrollableHeight:"500px"},e.mTexts={buttonDefaultText:"Select Route(s)"},e.days=["Weekdays","Weekends","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],e.day="Weekdays",e.$watch("selectedRoutes",function(e,t){e!==t&&i()},!0),e.compute=function(){var t=parseInt(e.times.start.match(/\d+/)),n=parseInt(e.times.end.match(/\d+/));-1!=e.times.start.indexOf("pm")&&(t+=12),-1!=e.times.end.indexOf("pm")&&(n+=12),t>n?e.badTime=!0:(e.badTime=!1,a())},e.$watch("lateness",function(e,t){e!==t&&i()}),e.showInfoWindow=function(t,n){var a=new google.maps.InfoWindow,i=new google.maps.LatLng(n.lat,n.lon);a.setContent("<div><span><b>Route:  </b>"+n.id+"</span><br/><span><b>Late(median):</b>  "+60*n.weight+" sec</span><br/><span><b>Lat/Lon:</b>  "+n.lat+" "+n.lon+"</span><br/></div>"),a.setPosition(i),a.open(e.busTimesMap)},a()}e.$inject=["$scope","dataService","NgMap"],angular.module("frontend").controller("MainController",e)}(),function(){"use strict";angular.module("customFilters",[]).filter("mn",function(){return function(e){return Number(e.substring(0,e.length-2))}}).filter("sizer",function(){return function(e){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}}).filter("getType",function(){return function(e){return e?-1!==e.indexOf("ShardMapRDD")?"Shard Map":-1!==e.indexOf("MapRDD")?"Map":-1!==e.indexOf("ShardReduceRDD")?"Shard Reduce":-1!==e.indexOf("FilterRDD")?"Filter":-1!==e.indexOf("SliceRDD")?"SliceRDD":void 0:"Idle"}}).filter("getDate",function(){return function(e){return new Date(e).toString()}}).filter("bytesToMB",function(){return function(e){return parseFloat(e/1024/1024).toFixed(2)}}).filter("encode",function(){return function(e){return encodeURIComponent(e)}}).filter("shortenStr",function(){return function(e,t){return e.substring(0,t)+"..."}}).filter("isDuplicate",function(){return function(e,t){var n;for(n in e)if(e[n].id===t)return!0;return!1}}).filter("millisToTime",function(){return function(e){var t={d:864e5,h:36e5,m:6e4,s:1e3,ms:1},n="";for(var a in t)if(e/t[a]>=1){var i=Math.floor(e/t[a]);e-=i*t[a],n+=i+a+" "}return n}}).filter("toArray",function(){return function(e,t){return t===!1?Object.keys(e).map(function(t){return e[t]}):Object.keys(e).map(function(t){return"object"==typeof e[t]?Object.defineProperty(e[t],"$key",{enumerable:!1,value:t}):void 0})}}).filter("alphaNum",function(){return function(e){return e.replace(/\W/g,"")}}).filter("secondsToTimeString",function(){return function(e){return"0"===e?"All Time":"60"===e?"1 min":"600"===e?"10 min":"3600"===e?"1 hour":void 0}}).filter("unique",function(){return function(e,t){return _.uniq(e,function(e){return e[t]})}})}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("frontend").run(e)}(),function(){"use strict";function e(e){e.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"vm"}).otherwise({redirectTo:"/"})}e.$inject=["$routeProvider"],angular.module("frontend").config(e)}(),function(){"use strict";angular.module("frontend")}(),function(){"use strict";function e(e){e.debugEnabled(!0)}e.$inject=["$logProvider"],angular.module("frontend").config(e)}(),angular.module("frontend").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container"><div class="cssload-dots" ng-if="loading"><div class="cssload-dot"></div><div class="cssload-dot"></div><div class="cssload-dot"></div><div class="cssload-dot"></div><div class="cssload-dot"></div></div><svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><filter id="goo"><fegaussianblur in="SourceGraphic" result="blur" stddeviation="12"></fegaussianblur><fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="goo"></fecolormatrix></filter></defs></svg><map zoom="11" id="map" center="[47.609722,-122.333056]" ng-if="vm.ready"><marker ng-if="marks === true && mapData" ng-repeat="pos in mapData" position="{{pos.lat}},{{pos.lon}}" on-click="showInfoWindow(event, pos)"></marker><heatmap-layer ng-if="heat === true && mapData" data="mapData" id="foo"></heatmap-layer></map><div class="controlsDB"><div class="choseTime"><select name="days" ng-options="days for days in days" ng-model="day"></select></div><div class="choseTime"><select name="start" ng-options="time for time in possibleTimes" ng-model="times.start"></select>to<select name="end" ng-options="time for time in possibleTimes" ng-model="times.end"></select><div><span ng-if="badTime">Start must become before end</span></div></div><div><button type="button" class="btn btn-primary" ng-click="compute()">Submit</button></div></div><div class="controls"><div><span>Lateness (min)</span> <input type="number" id="lateness" name="quantity" min="0" ng-model="lateness"></div><div ng-dropdown-multiselect="" options="routes" selected-model="selectedRoutes" extra-settings="mOptions" translation-texts="mTexts"></div><div><div class="checkbox"><label><input type="checkbox" value="marks" ng-click="marks = !marks">Markers</label></div><div class="checkbox"><label><input type="checkbox" value="heat" ng-click="heat = !heat">Heat Map</label></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-fa1049e1ff.js.map