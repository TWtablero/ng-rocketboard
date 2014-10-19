var app = angular.module('rockboardApp');

app.factory('GithubFacade', function(GithubRepository, LoginService, $http) {

  return {

    changeIssueLabel: function(issue, label) {
      GithubRepository.addLabelOnIssue(issue, label);
      GithubRepository.removeLabelFromIssue(issue, issue.status);

      issue.status = label;
    },

    getIssuesFromRepository: function(repository) {
      return GithubRepository.getIssuesFromRepository(repository);
    },

    fetchRepositories: function() {
      return $http.get("/api/repositories");
    }
  }

});
