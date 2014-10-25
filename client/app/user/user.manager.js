'use strict';

angular.module('rocketBoardApp').service('UserManager', function($http, GithubApi) {

  this.getUser = function(){
  	return $http.get(GithubApi.userUrl());
  };

});
