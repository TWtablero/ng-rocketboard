'use strict';

angular.module('rocketBoardApp').service('IssueRepository', function($http) {

  this.findByRepository = function(repository) {
    var url = repository.url + '/issues';

    return $http.get(url);
  };

  this.addLabel = function(issue, label) {
    var url = issue.url + '/labels';

    return $http.post(url,
      angular.toJson(
        [label]
      )
    );
  };

  this.update = function(update) {
    var url = issue.url;

    return $http.patch(url, update)
  };

  this.removeLabel = function(issue, label) {
    var url = issue.url + '/labels/' + label;

    return $http.delete(url);
  }

});
