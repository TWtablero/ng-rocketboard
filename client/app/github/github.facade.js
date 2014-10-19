var app = angular.module('rockboardApp');

app.factory('RepositoryFacade', function(RepositoryList, GithubRepository, LoginService, $http) {

  return {

    changeIssueLabel: function(issue, label) {
      GithubRepository.addLabelOnIssue(issue, label);
      GithubRepository.removeLabelFromIssue(issue, issue.status);

      issue.status = label;
    },

    getIssuesFromRepository: function(repository) {
      return GithubRepository.getIssuesFromRepository(repository);
    }
  }

});
