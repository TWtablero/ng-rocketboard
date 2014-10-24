var app = angular.module('rocketBoardApp', ['ngCookies', 'btford.socket-io', 'mgcrea.ngStrap', 'ngResource', 'ui.select', 'ngSanitize', 'ngRoute', 'ui.sortable', 'oauth'])

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

}).run(function($http, $rootScope, LoginService, $location, UserManager) {

  $rootScope.$on("$routeChangeStart", function(event, next, current) {

    if (next.params.access_token) {
      LoginService.login(next.params.access_token);
      $http.defaults.headers.common['Authorization'] = 'token ' + LoginService.getToken();

      UserManager.getUser().then(function(res) {
        $rootScope.user = res.data;
      });

      $location.url($location.path());
    }

    if (next.requireLogin && !LoginService.isLoggedIn())
      window.location = 'http://github.com/login/oauth/authorize?client_id=c8e53a399aaaf4423852&scope=public_repo';
  });

});

angular.module('rockboardApp', []);
