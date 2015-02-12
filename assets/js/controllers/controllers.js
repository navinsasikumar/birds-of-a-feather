/*jslint node: true */
/*jshint strict:false */
'use strict';

var birds = angular.module('birds.controllers', ['ngRoute']);

birds.controller('PostController', ['$scope', '$routeParams', 'Post',
  function($scope, $routeParams, Post) {
    $scope.greeting = 'Hello!';
    $scope.items = [
      {
        description: 'Do a thing',
        completed: true
      }, {
        description: 'Do another thing',
        completed: false
      }
    ];

    $scope.posts = Post.get({});

    /*$scope.changePassword = function() {
      $scope.userData.email = 'test';
    };*/
}]);

