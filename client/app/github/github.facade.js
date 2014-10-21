var app = angular.module('rockboardApp');

app.factory('GithubFacade', function(GithubRepository, LoginService, $http) {

  return {

    changeIssueLabel: function(issue, label) {
      return GithubRepository.removeLabelFromIssue(issue, label).then(function() {
        return GithubRepository.addLabelOnIssue(issue, issue.status).then(function(res) {
          issue.labels = res.data;
          return res;
        });
      });
    },

    addIssueLabel: function(issue, label) {
      return GithubRepository.addLabelOnIssue(issue, label);
    },

    getIssuesFromRepository: function(repository) {
      return GithubRepository.getIssuesFromRepository(repository);
    },

    fetchRepositories: function() {
      return $http.get("/api/repositories");
    }
  }

});
