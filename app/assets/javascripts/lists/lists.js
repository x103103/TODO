/**
 * Created by alex on 16.03.15.
 */
/**
 * Created by alex on 11.03.15.
 */
angular.module('flapperNews')
    .factory('lists', [
        '$http',
        function($http){
            var o = {
                lists: []
            };

            o.getAll = function() {
                return $http.get('/lists.json').success(function(lists){
                    angular.copy(lists, o.lists);
                });
            };

            o.create = function(list) {
                return $http.post('/lists.json', list).success(function(list){
                    o.lists.push(list);
                });
            };

            o.update = function(list) {
                return $http.patch('/lists/' + list.id, list);
            };

            o.destroy = function(list) {
                return $http.delete('/lists/'+ list.id).success(function(){
                    o.lists.splice(o.lists.indexOf(list),1);
                });
            };

            return o;
        }]);
