/*jslint node: true */
/*jshint strict:false */
'use strict';

// Declare app level module which depends on views, and components
angular.module('birds', [
  'ngRoute',
  'birds.controllers',
  'birds.services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
