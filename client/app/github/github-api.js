'use strict';

angular.module('rocketBoardApp').factory('GithubApi', function() {
  var that = this;

  this.url = 'https://api.github.com';

  this.appendPerPage = function(url) {
    //TODO: I'm sorry about this response_id to remove cache. 
    return url + '?per_page=100&response_id=' + Math.random().toString(36).substring(7);
  };

  return {

    getUrl: function() {
      return that.url;
    }

  };

});
