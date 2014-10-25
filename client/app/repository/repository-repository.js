'use strict';

angular.module('rocketBoardApp').service('RepositoryRepository', function($http, GithubApi) {

  this.findList = function() {
  	var url = GithubApi.getUrl() + '/user/repos';

    return $http.get(url);
  };

});
