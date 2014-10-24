var app = angular.module('rocketBoardApp');

app.service('RepositoryManager', function($http, $q, GithubApi) {

  this.getRepositoriesIssues = function(repositories) {
    var that = this;
    var promises = [];

    _.forEach(repositories, function(repository) {
      promises.push(that.getRepositoryIssue(repository));
    });

    return $q.all(promises);
  };

  this.getRepositoryIssue = function(repository) {
    if (repository.issues)
      $q.defer().resolve(repository);
    else
      return $http.get(GithubApi.issuesUrl(repository)).then(function(res) {
        repository.issues = res.data;
      });

  };

  this.getList = function() {
    return $http.get(GithubApi.userRepositoriesUrl());
  };

});
