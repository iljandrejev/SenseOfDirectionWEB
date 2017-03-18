'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.create_game',
  'myApp.version'
])
    //Config
    .constant('appConfig',{
        remoteAPIServiceHost: 'http://localhost:28961/',
        mapboxAccessToken: "pk.eyJ1IjoiaWxqYW5kcmVqZSIsImEiOiJjaXpxdXFvNW0wMDFkMnJvMXJ2ZThkbXl4In0.nmD8qExtjSK-lSOAgCAs5Q",
        getRemoteServiceUrl: function(path){
            return this.remoteAPIServiceHost + path;
        }


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
    .config(['$locationProvider', '$routeProvider', '$httpProvider',function($locationProvider, $routeProvider, $httpProvider) {

  //$locationProvider.hashPrefix('!');
  /*  $routeProvider.
    when('/games', {templateUrl: 'view1/view1.html',   controller: PhoneListCtrl}).
    when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
    otherwise({redirectTo: '/phones'});*/
    //$locationProvider.html5Mode(true);

    $routeProvider

        .otherwise({redirectTo: '/view1'});

        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';



}]);

