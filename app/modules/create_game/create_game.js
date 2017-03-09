'use strict';

angular.module('myApp.create_game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider, accessFac) {
  $routeProvider.when('/game/create', {
    templateUrl: '/modules/create_game/view.html',
    controller: 'CreateGame',
      resolve:{
          "check":function($location){   //function to be resolved, accessFac and $location Injected
              if(sessionStorage.key('access_token') != undefined){    //check if the user has permission -- This happens before the page loads

              }else{
                  $('.ui.modal.login').modal('show');
                  $location.path('/');                //redirect user to home if it does not have permission.

              }
          }
      }
  });
}])

.controller('CreateGame', ['$scope','$http',function($scope, $http) {
    $scope.formData = {
        startDT: "2017-03-06T16:49:16.976Z",
        endDT: "2017-03-06T16:49:16.976Z"
    };
    $scope.submit = function(){
        $('.create_game .ui.dimmer').removeClass('disabled').addClass('active');
        $scope.formData.Lat = parseFloat($scope.formData.game_init_lat);
        $scope.formData.Lng = parseFloat($scope.formData.game_init_lng);
        $http({
            method: 'POST',
            url: 'http://localhost:28961/api/game',
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

    }
}]);