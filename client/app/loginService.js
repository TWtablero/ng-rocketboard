var app = angular.module("rockboardApp");

app.factory("LoginService", function($q, $http) {
  var that = this;
  that.access_token = null;

  return {

    login: function(access_token) {
      that.access_token = access_token;
    },

    getToken: function(){
    	return that.access_token
    },

    logOut: function(access_token) {
      that.access_token = null;
    },

    isLoggedIn: function() {
      var promise = $q.defer();

      if (that.access_token) {
        promise.resolve(true);
        return promise.promise;
      }

      return $http.get("/api/login/token");

    }
  }

});
