/**
 * Created by alex on 14.03.15.
 */
angular.module('flapperNews')
    .controller('AuthCtrl', [
        '$scope',
        '$state',
        'Auth',
        function($scope,$state,Auth){
            $scope.login = function() {
                Auth.login($scope.user).then(function(){
                    $scope.loginError = false;
                    $state.go('lists');
                },function(){
                    $scope.loginError = true;
                });
            };

            $scope.register = function() {
                $scope.submitted = true;
                Auth.register($scope.user).then(function(){
                    $state.go('lists');
                });
            };
        }]);