'use strict';

angular.module('rocketBoardApp').service('UserRepository', function($http, GithubApi) {

  this.find = function(){
  	var url = GithubApi.getUrl() + "/user";

  	return $http.get(url);
  };

});
