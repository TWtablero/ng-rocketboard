var app = angular.module("rockboardApp");

app.factory("GithubRepository", function($http, LoginService, GithubApi) {
  var that = this;

  return {

    addLabelOnIssue: function(issue, label) {
      return $http.post(GithubApi.addLabelUrl(issue),
        angular.toJson(
          [label]
        )
      );
    },

    removeLabelFromIssue: function(issue, label) {
      return $http.delete(GithubApi.removeLabelUrl(issue, label));
    },

    getIssuesFromRepository: function(repository) {
      return $http.get(GithubApi.issuesUrl(repository), {cache:false});
    }

  }

});