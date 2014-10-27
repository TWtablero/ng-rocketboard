'use strict';

describe('GithubApi', function() {
  var GithubApi;
  
  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    inject(function(_GithubApi_) {
      GithubApi = _GithubApi_;
    });
  });

  describe('when call getUrl', function() {

    it('should return github api url', function() {
      expect(GithubApi.getUrl()).to.be.equals('https://api.github.com');
    });

  });

});
