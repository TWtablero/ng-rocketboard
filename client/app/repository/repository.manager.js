var app = angular.module('rockboardApp');

app.factory('RepositoryManager', function(RepositoryList, GithubRepository, $q) {

  var that = this;

  that.repositories = RepositoryList.getAll();
  that.repository = that.repositories[0];

  return {

    changeRepository: function(repository) {
      that.repository = repository;
    },

    getRepository: function() {
      return that.repository;
    }
  }

});
