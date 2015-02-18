/*jslint node: true */
/*jshint strict:false */
'use strict';

var birds = angular.module('birds.controllers', ['ngRoute']);

birds.controller('PostController', ['$scope', '$routeParams', 'Posts', 'Post', 'UserPosts',
  function($scope, $routeParams, Posts, Post, UserPosts) {
    $scope.posts = Posts.get({}); //TODO Getting the scope like this and using index is probably broken
    $scope.postTypes = ['Regular', 'ID Help', 'Alert', 'Photo'];
    $scope.newPostType = $scope.postTypes[0];

    $scope.submitPost = function() {
      var userid = 1;
      var content = $scope.newPostContent;
      var type = $scope.newPostType;

      UserPosts.post({userid: userid, user: userid, content: content, type: type}, function(response) {
        $scope.posts.posts.unshift(response.post);
        $scope.newPostContent = '';
      });
    };

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

    $scope.submitComment = function(post, index) {
      var userid = post.user.id;
      var postid = post.id;
      var content = $scope.posts.posts[index].newComment;
      //console.log($scope.posts.posts[index].comments);
      Post.comment({userid: userid, user: userid, postid: postid, content: content}, function (response) {
        $scope.posts.posts[index].comments.push(response.comment);
        $scope.posts.posts[index].newComment = '';
      });
    };


    /*$scope.changePassword = function() {
      $scope.userData.email = 'test';
    };*/
}]);
