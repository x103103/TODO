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

            $scope.positioning = function(){
                var positions = [];
                angular.forEach($scope.lists,function(list,k){
                    var t = list.tasks.length;
                    angular.forEach(list.tasks,function(task,kk){
                        if(task.position !== t - kk){
                            task.position = t - kk;
                            positions.push({
                                id: task.id,
                                position: task.position
                                });
                        }
                    });
                });
                tasks.positioning(positions);
            };
            $scope.sortableOptions = {
                connectWith: ".list-group",
                handle: '.myHandle',
                stop: function(e, ui) {
                    // this callback has the changed model
                    $scope.positioning();
                }
            };



            $scope.getView = function (item) {
                /*
                 you can return a different url
                 to load a different template dynamically
                 based on the provided item
                 */
                if (item) {
                    //return 'tasks.html';
                    return 'lists/_tasks.html';
                }
                return null;
            };

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
            };


            $scope.addTask = function(list){
                if(!list.newTaskText || list.newTaskText === '') { return; }

                tasks.create(list, {
                    text:list.newTaskText,
                    datetime:list.newTaskDatetime,
                    position:list.tasks.length
                }).success(function() {
                    delete list.newTaskText;
                    delete list.newTaskDatetime;
                    $scope.positioning();
                });
            };

            $scope.updateTask = function(task){
                if(!task.editText && !task.editDone) { return; }
                tasks.update(task).success(function() {
                    task.editText = 0;
                    task.editDone = 0;
                });
            };

            $scope.onTimeSet = function(newTime,oldTime,task){
                tasks.update(task).success(function() {
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
            };

            $scope.taskDatetime = function(datetime){
                if(!datetime || datetime === '') {return ;}
                if(typeof datetime === 'string') {
                    datetime = Date.parse(datetime);
                }

                return datetime;
            };
        }]);
