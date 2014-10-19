var app = angular.module('rockboardApp');

app.factory('RepositoryList', function() {

  return {

    getAll: function() {
      return [{
        id: "0",
        username: "marcioviegas",
        name: "agenda"
      }]
    }

  }

});
