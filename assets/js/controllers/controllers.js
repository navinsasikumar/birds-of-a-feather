/*jslint node: true */
/*jshint strict:false */
'use strict';

var birds = angular.module('birds.controllers', ['ngRoute']);

birds.controller('PostController', ['$scope', '$routeParams', 'Posts', 'Post',
  function($scope, $routeParams, Posts, Post) {
    $scope.posts = Posts.get({});

    $scope.upVote = function(post, index) {
      var userid = post.user.id;
      var postid = post.id;
      Post.upVote({userid: userid, postid: postid}, function (response) {
        $scope.posts.posts[index].votes = response.votes;
      });
    };

    $scope.downVote = function(post, index) {
      var userid = post.user.id;
      var postid = post.id;
      Post.downVote({userid: userid, postid: postid}, function (response) {
        $scope.posts.posts[index].votes = response.votes;
      });
    };


    /*$scope.changePassword = function() {
      $scope.userData.email = 'test';
    };*/
}]);

