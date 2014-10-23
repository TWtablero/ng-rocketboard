var app = angular.module('rockboardApp', ['ngCookies', 'btford.socket-io', 'mgcrea.ngStrap', 'ngResource', 'ui.select', 'ngSanitize', 'ngRoute', 'ui.sortable', 'oauth'])

app.config(function($httpProvider, $routeProvider, $locationProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'app/board/board.html',
      controller: 'BoardController',
      requireLogin: true
    });

  $routeProvider.otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

}).run(function($rootScope, LoginService, $location) {

  $rootScope.$on("$routeChangeStart", function(event, next, current) {

    if(next.params.access_token){
      LoginService.login(next.params.access_token);
      $location.url($location.path());
    }

    if (next.requireLogin && !LoginService.isLoggedIn())
      window.location = 'http://github.com/login/oauth/authorize?client_id=c8e53a399aaaf4423852';

  });

});
