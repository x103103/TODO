/**
 * Created by alex on 11.03.15.
 */
angular.module('flapperNews')
    .factory('tasks', [
        '$http',
        'lists',
        function($http,lists){

            var o = {
                lists: lists.lists
            };

            o.create = function(list,task) {
                return $http.post('/lists/' + list.id + '/tasks.json', task).success(function(task){
                    list.tasks.push(task);
                });
            };

            o.update = function(task) {
                return $http.patch('/tasks/' + task.id, task);
            };

            o.destroy = function(list,task) {
                return $http.delete('/tasks/'+ task.id).success(function(){
                    var listIndex = o.lists.indexOf(list);
                    var taskIndex = o.lists[listIndex].tasks.indexOf(task);
                    o.lists[listIndex].tasks.splice(taskIndex,1);
                });
            };

            return o;
        }]);
