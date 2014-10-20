var app = angular.module('rockboardApp');

app.factory('GithubFacade', function(GithubRepository, LoginService, $http) {

  return {

    changeIssueLabel: function(issue, label) {

      return GithubRepository.removeLabelFromIssue(issue, issue.status).then(function() {
        issue.status = label;
        return GithubRepository.addLabelOnIssue(issue, label).then(function(label) {
          issue.labels = label.data;
        });
      });
    },

    addIssueLabel: function(issue, label) {
      issue.status = label;
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