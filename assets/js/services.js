var birds = angular.module('birds.services', ['ngResource']);

birds.factory('Post', ['$resource',
  function($resource){
    return $resource('posts', {}, {
      get: {method:'GET'}
    });
  }
]);
