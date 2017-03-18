'use strict';

angular.module('myApp.create_game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider, accessFac) {
  $routeProvider.when('/game/create', {
    templateUrl: '/modules/create_game/view.html',
    controller: 'CreateGame',
      resolve:{
          "check":function($location){   //function to be resolved, accessFac and $location Injected
              if(sessionStorage.key('access_token') == undefined){    //check if the user has permission -- This happens before the page loads

              }else{
                  $('.ui.modal.login').modal('show');
                  $location.path('/');                //redirect user to home if it does not have permission.

              }
          }
      }
  });
}])

.controller('CreateGame', function ($scope, $http , appConfig) {
    var map, marker, circle;
    L.mapbox.accessToken = appConfig.mapboxAccessToken;
    var formData = $scope.formData = {
        startDT: "2017-03-06T16:49:16.976Z",
        endDT: "2017-03-06T16:49:16.976Z"
    };
    $scope.radius = function(){
        if(formData.initLat == undefined|| formData.initLng == undefined){
            alert('Please select middlepoint first!');
            formData.radius = null;
            return false;
        }else{
            if(circle == undefined){
                circle = L.circle([formData.initLat, formData.initLng], formData.radius).addTo(map);
            }else{
                circle.setRadius(formData.radius);
            }
        }
    };
    $scope.submit = function(){
        $('.create_game .ui.dimmer').removeClass('disabled').addClass('active');
        $scope.formData.Lat = parseFloat($scope.formData.game_init_lat);
        $scope.formData.Lng = parseFloat($scope.formData.game_init_lng);
        $http({
            method: 'POST',
            url: appConfig.getRemoteServiceUrl('api/game'),
            headers: {
                "Authorization" : "bearer o8fhM4RNcxHl0LW9ccAwWvl-_XQBHG_hryqa6CgoFxo11-rnxAtEp9ht0aZCKGIOIT04SyzAlbBY4mR5NHbvrmdjKlqvVY7P-LsFFstyfNtUSfOWRgfuc6N_KzlN5vgOI9d_peJrrwBmyMkf1rIJbOxb0DgrBkd6_u1XRMud31oCPNdY2qIphhMlZ4hUVabxODPBtvqG3MRFKFVQhcZwinclOWj0HdIzgStZ9YQ0Q3htTbwMZ_Vk7yk77HjfyYT5lZW2ejndb-WyD24TC-Rt6OpDg6lmSFUIDxip2rJPVfzLmxaLeSW1DMCw0rZ-MAzwLg4IBAKK-bKaKYelKV8Ev-VBVPXDPC4JPYcnnu70ubi9rKDr-A_sT3vGtZQFAxCRjS6CM58ZnND_RbwZH4wNfvf0eIJ1bLlQqr9SMlN7Vlqww8XU1pqXCcPqltgdKY5DGPkgxq_kTsXiucwFE8LJOQ"
            },
            data : $scope.formData
        }).then(function successCallback(response){
            $('.create_game .ui.dimmer').fadeOut(600);
            console.log(response);
            console.log('success');

        }, function errorCallback(response){
            console.log(response);
            console.log('failer');
        });
        console.log($scope.formData);

    };

    $scope.init = function(){

        map = L.mapbox.map('map', 'mapbox.streets')
            .setView([59.39547889999999, 24.664316900000017], 17);
        marker = L.marker(new L.LatLng(59.39547889999999, 24.664316900000017), {
            icon: L.mapbox.marker.icon({
                'marker-color': 'ff8888'
            })
        });
        var scope = angular.element($(".form.create_game")).scope();
        map.on('click',function(e){
            marker.setLatLng(e.latlng);
            marker.addTo(map);
            scope.$apply(function(){
                console.log(scope);
                var formData = scope.formData;
                formData.initLat = e.latlng.lat;
                formData.initLng = e.latlng.lng;
                if(circle != undefined){
                    circle.setLatLng([e.latlng.lat,e.latlng.lng ]);
                }

            });
        });


        $('.ui.form.create_game')
            .form({
                fields: {
                    game_title: {
                        identifier: 'game_title',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Please enter game title'
                            }
                        ]
                    },
                    game_description: {
                        identifier: 'game_description',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Please enter game description'
                            }
                        ]
                    },
                    gender: {
                        identifier: 'gender',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Please select a gender'
                            }
                        ]
                    },
                    username: {
                        identifier: 'username',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Please enter a username'
                            }
                        ]
                    },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Please enter a password'
                            },
                            {
                                type   : 'minLength[6]',
                                prompt : 'Your password must be at least {ruleValue} characters'
                            }
                        ]
                    },
                    terms: {
                        identifier: 'terms',
                        rules: [
                            {
                                type   : 'checked',
                                prompt : 'You must agree to the terms and conditions'
                            }
                        ]
                    }
                }
            })
        ;
    };
});