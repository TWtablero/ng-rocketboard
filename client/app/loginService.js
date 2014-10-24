var app = angular.module("rocketBoardApp");

app.factory("LoginService", function($q, $http) {
  var that = this;

  that.access_token = null;

  return {

    login: function(access_token) {
      that.access_token = access_token;
    },

    getToken: function() {
      return that.access_token
    },

    logOut: function(access_token) {
      that.access_token = null;
    },

    isLoggedIn: function() {
      return that.access_token;
    }
  }

});
