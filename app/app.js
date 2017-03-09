'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.create_game',
  'myApp.version'
])
    .constant('appConfig',{
        remoteAPIService: 'http://localhost:28961/'
})
    .factory('accessFac',function(){
        var obj = {}
        this.access = false;
        obj.getPermission = function(){    //set the permission to true
            this.access = true;
        }
        obj.checkPermission = function(){
            return this.access;             //returns the users permission level
        }
        return obj;
    })
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');
  /*  $routeProvider.
    when('/games', {templateUrl: 'view1/view1.html',   controller: PhoneListCtrl}).
    when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
    otherwise({redirectTo: '/phones'});*/
    //$locationProvider.html5Mode(true);

    $routeProvider

        .otherwise({redirectTo: '/view1'});

}]);

