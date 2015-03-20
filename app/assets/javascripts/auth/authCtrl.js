/**
 * Created by alex on 14.03.15.
 */
angular.module('flapperNews')
    .controller('AuthCtrl', [
        '$scope',
        '$state',
        'Auth',
        function($scope, $state, Auth){
            $scope.login = function() {
                Auth.login($scope.user).then(function(){
                    $state.go('lists');
                });
            };

            $scope.register = function() {
                Auth.register($scope.user).then(function(){
                    $state.go('lists');
                });
            };
        }]);