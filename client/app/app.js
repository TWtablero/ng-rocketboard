
var app = angular.module('rockboardApp', ['ngCookies', 'mgcrea.ngStrap', 'ngResource', 'ui.select', 'ngSanitize', 'ngRoute', 'ui.sortable', 'oauth'])

app.config(function($httpProvider, $routeProvider, $locationProvider, $httpProvider) {

  $routeProvider
    .when('/home', {
      templateUrl: 'app/board/board.html',
      controller: 'BoardController'
    });

  $routeProvider.otherwise({
    redirectTo: '/home'
  });

  $locationProvider.html5Mode(true);

}).run(function($rootScope, LoginService, $location) {

  $rootScope.$on("$routeChangeStart", function(event, next, current) {

    LoginService.isLoggedIn().then(function(loggedIn) {

      if (loggedIn.data) {
        LoginService.login(loggedIn.data);
      } else {
        window.location = 'https://github.com/login/oauth/authorize/?client_id=c8e53a399aaaf4423852&scope=public_repo';
      }

    });

  });

});
