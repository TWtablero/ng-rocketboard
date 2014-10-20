'use strict';

angular.module('rockboardApp').controller('BoardController', function($rootScope, $scope, BoardFactory, GithubFacade, BoardManipulator, BoardManager) {

  $scope.board = BoardFactory.createSpringBoard();
  $scope.multipleOptions = {};
  $scope.multipleOptions.selectedRepositories = [];
  $scope.multipleOptions.selectedIssues = [];

  GithubFacade.fetchRepositories().then(function(res) {
    $scope.repositories = res.data;
  });

  $scope.$watch("multipleOptions.selectedRepositories", function() {
    //TODO: Please, change this!
    BoardManipulator.cleanBoard($scope.board, $scope.multipleOptions.selectedRepositories);
    _.forEach($scope.multipleOptions.selectedRepositories, function(repository) {
      if (!repository.issues)
        GithubFacade.getIssuesFromRepository(repository).then(function(issues) {
          repository.issues = issues.data
          BoardManipulator.addRepository($scope.board, repository);
          $("span:contains('" + repository.name + "')").closest(".ui-select-match-item").css("background", repository.color);
        });
      else{
        BoardManipulator.addRepository($scope.board, repository);
        $("span:contains('" + repository.name + "')").closest(".ui-select-match-item").css("background", repository.color);
      }
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

});
