var app = angular.module("rocketBoardApp");

app.service('UserManager', function($http, GithubApi) {
  var that = this;

  this.getUser = function(){
  	return $http.get(GithubApi.userUrl());
  };

});
