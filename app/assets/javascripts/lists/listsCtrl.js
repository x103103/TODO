/**
 * Created by alex on 16.03.15.
 */
angular.module('flapperNews')
    .controller('ListsCtrl', [
        '$scope',
        'lists',
        'tasks',
        function($scope,lists, tasks){
            $scope.lists = lists.lists;

            $scope.addList = function(){
                lists.create().success(function(list) {
                    list.edit = 1;
                });
            };

            $scope.updateList = function(list){
                if(!list.edit) {return ;}
                lists.update(list).success(function() {
                    list.edit = 0;
                });
            };

            $scope.destroyList = function(list){
                lists.destroy(list);
            };

            $scope.listEditForm = function(list){
                if(!list.edit || list.edit === '') {
                    list.edit = 1;
                } else {
                    list.edit = 0;
                }
            }


            $scope.addTask = function(list){
                if(!list.newTaskText || list.newTaskText === '') { return; }
                tasks.create(list, {text:list.newTaskText}).success(function() {
                    delete list.newTaskText;
                });
            };

            $scope.updateTask = function(task){
                if(!task.editText && !task.editDone) { return; }
                tasks.update(task).success(function() {
                    task.editText = 0;
                    task.editDone = 0;
                });
            };

            $scope.destroyTask = function(list, task){
                tasks.destroy(list,task);
                delete task;
            };

            $scope.taskEditForm = function(task){
                if(!task.editText || task.editText === '') {
                    task.editText = 1;
                } else {
                    task.editText = 0;
                }
            }
        }]);
