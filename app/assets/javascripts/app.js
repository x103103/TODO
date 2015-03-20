/**
 * Created by alex on 11.03.15.
 */
angular.module('flapperNews', ['ui.router','templates','Devise'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        'AuthProvider',
        function($stateProvider, $urlRouterProvider,AuthProvider) {
            AuthProvider.logoutPath('users/sign_out.json');
            AuthProvider.logoutMethod('GET');

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/_home.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['posts', function(posts){
                            return posts.getAll();
                        }]
                    }
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: 'posts/_posts.html',
                    controller: 'PostsCtrl',
                    resolve: {
                        post: ['$stateParams', 'posts', function($stateParams, posts) {
                            return posts.get($stateParams.id);
                        }]
                    }
                })
                .state('lists', {
                    url: '/list',
                    templateUrl: 'lists/_lists.html',
                    controller: 'ListsCtrl',
                    resolve: {
                        postPromise: ['lists', function(lists){
                            return lists.getAll();
                        }]
                    },
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            return ;
                        },function() {
                            $state.go('login');
                        });
                    }]
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'auth/_login.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('lists');
                        })
                    }]
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'auth/_register.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('lists');
                        })
                    }]
                });

            $urlRouterProvider.otherwise('login');
        }])
    .directive('focusOn',['$timeout',function($timeout) {
        return {
            restrict : 'A',
            link : function($scope,$element,$attr) {
                $scope.$watch($attr.focusOn,function(_focusVal) {
                    $timeout(function() {
                        _focusVal ? $element.focus() :
                            $element.blur();
                    });
                });
            }
        }
    }]);

