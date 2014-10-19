var app = angular.module('rockboardApp');

app.factory('BoardManager', function(GithubRepository, $http) {

  var that = this;

  return {

    changeRepositories: function(repositories) {
      that.repositories = repositories;
    },

    getRepositories: function() {
      return that.repositories;
    },

    getAllRepositories: function() {
      return that.allRepositories;
    }
  }

});
