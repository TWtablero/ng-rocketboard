'use strict';

angular.module('rocketBoardApp').service('UserLoginService', function() {
  var that = this;

  this.login = function(access_token) {
    that.access_token = access_token;
  };

  this.getToken = function() {
    return that.access_token;
  };

  this.logOut = function() {
    that.access_token = null;
  };

  this.isLoggedIn = function() {
    return that.access_token ? true : false;
  };

});