'use strict';

angular.module('rockboardApp').controller('BoardController', function($scope, BoardFactory, GithubFacade, BoardManipulator, BoardManager) {

  $scope.board = BoardFactory.createSpringBoard();

  // We all know I can make it better, but ...
  $scope.$on('repositories:changed', function() {
    _.forEach(BoardManager.getRepositories(), function(repository) {
      GithubFacade.getIssuesFromRepository(repository).then(function(issues) {
        BoardManipulator.addIssues($scope.board, issues.data, BoardManager.getRepositories());
      });
    });
  });

  $scope.boardSortOptions = {
    containment: '#board',
    itemMoved: function(event) {
      var issue = event.source.itemScope.modelValue;
      var column = event.dest.sortableScope.$parent.column;
      GithubFacade.changeIssueLabel(issue, column.label);
    },

    orderChanged: function(event) {}
  };

}).controller("BoardMenuController", function($rootScope, $scope, $http, BoardManager) {

  BoardManager.fetchRepositories().then(function(res) {
    $scope.repositories = res.data;
    $rootScope.$broadcast("repositories:changed");
  });

});
