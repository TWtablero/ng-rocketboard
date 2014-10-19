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

    getAllRepositories: function(){
      return that.allRepositories;
    },

    fetchRepositories: function() {
      return $http.get("/api/repositories").then(function(res) {
        that.allRepositories = res.data;
        that.repositories = res.data;
        console.log(that.repositories);
        return res.data;
      });
    }
  }

});
