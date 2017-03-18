/**
 * Created by ilja.andrejev on 06.03.2017.
 */
function HeroDetailController($scope, $http ,appConfig) {
$scope.signupWin = function(){
    $('.signup').modal({
        blurring: true
    }).modal('show');
};
$scope.loginWin = function(){
    $('.login').modal('show');
};
$scope.login = {
    grant_type: 'password'
};
$scope.signup = {};
$scope.submitSignUp = function(){
    alert('started');
    console.log($scope.signup);
    $http({
        method: 'POST',
        url: appConfig.getRemoteServiceUrl('api/account/register'),
        data: $scope.signup

    }).then(function successCallback(response){
        alert('Registration success! ');
        $('.signup').modal('hide');
        $scope.loginWin();
        console.log(response);
        console.log('success');

    }, function errorCallback(response){
        alert('Registration failed');
        console.log(response);
        console.log('failer');
    });
};
$scope.submitSignIn = function(){
    $http({
        method: 'POST',
        url: appConfig.getRemoteServiceUrl('Token'),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $scope.login

    }).then(function successCallback(response){
        alert('Login successided! ');

        console.log(response);


    }, function errorCallback(response){
        alert('Login failed');
        console.log(response);
        console.log('failer');
    });
};

$scope.test_click = function() {

}

}

angular.module('myApp').component('mainMenu', {
    templateUrl: '/components/main_menu/mainMenu.html',
    controller: HeroDetailController,
    bindings: {
        hero: '='
    }
});