'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: '/modules/view1/view1.html',
            controller: 'View1Ctrl',

        });
    }])

    .controller('View1Ctrl', function ($scope, $http , appConfig) {

        $http({
            method: 'GET',
            url: appConfig.remoteAPIService + 'api/game',
            headers: {
                "Authorization" : "bearer o8fhM4RNcxHl0LW9ccAwWvl-_XQBHG_hryqa6CgoFxo11-rnxAtEp9ht0aZCKGIOIT04SyzAlbBY4mR5NHbvrmdjKlqvVY7P-LsFFstyfNtUSfOWRgfuc6N_KzlN5vgOI9d_peJrrwBmyMkf1rIJbOxb0DgrBkd6_u1XRMud31oCPNdY2qIphhMlZ4hUVabxODPBtvqG3MRFKFVQhcZwinclOWj0HdIzgStZ9YQ0Q3htTbwMZ_Vk7yk77HjfyYT5lZW2ejndb-WyD24TC-Rt6OpDg6lmSFUIDxip2rJPVfzLmxaLeSW1DMCw0rZ-MAzwLg4IBAKK-bKaKYelKV8Ev-VBVPXDPC4JPYcnnu70ubi9rKDr-A_sT3vGtZQFAxCRjS6CM58ZnND_RbwZH4wNfvf0eIJ1bLlQqr9SMlN7Vlqww8XU1pqXCcPqltgdKY5DGPkgxq_kTsXiucwFE8LJOQ"
            }
        }).then(function successCallback(response) {
            console.log(response);
            console.log('success');
            $('.cards .dimmer').fadeOut(800);
            //$('.ui.dimmer').removeClass('active').addClass('disabled');
            $scope.games = response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            $('.cards .dimmer').fadeOut(800);
            if(response.status == 401){
                $('.ui.modal.login').modal('show');
            }
            console.log(response);

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    });