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
                return $http.get('/lists.json').success(function(data){
                    angular.copy(data, o.lists);
                });
            };

            o.create = function(list) {
                return $http.post('/lists.json', list).success(function(data){
                    o.lists.push(data);
                });
            };

            o.update = function(list) {
                return $http.patch('/lists/' + list.id, list).success(function(data){
                    list.edit = 0;
                });
            };

            o.destroy = function(list) {
                return $http.delete('/lists/'+ list.id).success(function(){
                    o.lists.splice(o.lists.indexOf(list),1);
                });
            };
            //
            //o.upvote = function(list) {
            //    return $http.put('/posts/' + post.id + '/upvote.json')
            //        .success(function(data){
            //            post.upvotes += 1;
            //        });
            //};
            //
            //o.get = function(id) {
            //    return $http.get('/posts/' + id).then(function(res){
            //        return res.data;
            //    });
            //};
            //
            //o.addComment = function(id, comment) {
            //    return $http.post('/posts/' + id + '/comments.json', comment);
            //};
            //
            //o.upvoteComment = function(post, comment) {
            //    return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
            //        .success(function(data){
            //            comment.upvotes += 1;
            //        });
            //};

            return o;
        }]);
