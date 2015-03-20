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
                if(!list.edit) {return ;}
                lists.update(list);
            };

            $scope.addTask = function(list){
                if(!list.text || list.text === '') { return; }
                lists.addTask(list.id, {
                    text: list.text
                }).success(function(task) {
                    delete list.text;
                    list.tasks.push(task);
                });
            };
        }]);
