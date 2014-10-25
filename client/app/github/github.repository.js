'use strict';

angular.module('rocketBoardApp').factory('GithubRepository', function($http, LoginService, GithubApi) {
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

  };

});