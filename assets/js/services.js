var birds = angular.module('birds.services', ['ngResource']);

birds.factory('Posts', ['$resource',
  function($resource){
    return $resource('posts', {}, {
      get: {method:'GET'}
    });
  }
]);

birds.factory('Post', ['$resource',
  function($resource) {
    return $resource('users/:userid/posts/:postid/',
      {userid: '@userid', postid: '@postid'},
      {
        upVote: {
          method: 'PUT',
          url: '/users/:userid/posts/:postid/votes/up'
        },
        downVote: {
          method: 'PUT',
          url: '/users/:userid/posts/:postid/votes/down'
        }

      });
  }
]);
