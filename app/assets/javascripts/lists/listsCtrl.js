/**
 * Created by alex on 16.03.15.
 */
angular.module('flapperNews')
    .controller('ListsCtrl', [
        '$scope',
        'lists',
        function($scope,lists){
            $scope.lists = lists.lists;

            $scope.addList = function(){
                if(!$scope.title || $scope.title === '') { return; }
                lists.create({
                    title: $scope.title
                });
                $scope.title = '';
            };
            $scope.destroyList = function(list){
                lists.destroy(list);
            };

            $scope.editForm = function(data){
                if(data.c){
                    data.list.edit = 1;
                }
            };
            $scope.updateList = function(list){
                lists.update(list);
            };
        }]);
