/**
 * Created by ilja.andrejev on 06.03.2017.
 */
function HeroDetailController($scope, $http ,appConfig) {
$scope.signupWin = function(){
    $('.signup').modal('show');
};
$scope.loginWin = function(){
    $('.login').modal('show');
};
$scope.login = {};
$scope.signup = {};
$scope.submitSignUp = function(){
    alert('started');
    $http({
        method: 'POST',
        url: appConfig.remoteAPIService + 'api/account/register',
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