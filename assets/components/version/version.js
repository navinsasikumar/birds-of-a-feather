'use strict';

angular.module('birds.version', [
  'birds.version.interpolate-filter',
  'birds.version.version-directive'
])

.value('version', '0.1');
