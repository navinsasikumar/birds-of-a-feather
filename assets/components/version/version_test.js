'use strict';

describe('birds.version module', function() {
  beforeEach(module('birds.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
