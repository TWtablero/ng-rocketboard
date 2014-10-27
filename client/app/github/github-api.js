'use strict';

angular.module('rocketBoardApp').factory('GithubApi', function() {
  var that = this;

  this.url = 'https://api.github.com';

  return {

    getUrl: function() {
      return that.url;
    }

  };

});
