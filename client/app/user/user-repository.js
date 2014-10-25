'use strict';

angular.module('rocketBoardApp').service('UserRepository', function($http, GithubApi) {

  this.getUser = function(){
  	var url = GithubApi.getApiUrl() + "/user";

  	return $http.get(url);
  };

});
