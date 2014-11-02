'use strict';

var app = angular.module('rocketBoardApp', ['ngCookies', 'angular-loading-bar', 'btford.socket-io', 'mgcrea.ngStrap', 'ngResource', 'ui.select', 'ngSanitize', 'ngRoute', 'ui.sortable', 'oauth']);

app.config(function($httpProvider, $routeProvider, $locationProvider) {

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

}).run(function($http, $rootScope, UserLoginService, $location, UserManager) {

  // REMOVE THIS FROM HERE!!!!! GET FROM SERVER!!!
  var clientID = "c8e53a399aaaf4423852";

  $rootScope.$on('$routeChangeStart', function(event, next) {

    if (next.params.access_token) {
      UserLoginService.login(next.params.access_token);
      $http.defaults.headers.common.Authorization = 'token ' + UserLoginService.getToken();

      UserManager.find().then(function(res) {
        $rootScope.user = res.data;
      });

      $location.url($location.path());
    }

    if (next.requireLogin && !UserLoginService.isLoggedIn()){
      window.location = 'http://github.com/login/oauth/authorize?client_id='+clientID+'&scope=public_repo';
    }
  });

}).config(function(cfpLoadingBarProvider){
  cfpLoadingBarProvider.includeSpinner = false;
});
