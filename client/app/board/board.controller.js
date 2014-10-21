'use strict';

angular.module('rockboardApp').controller('BoardController', function($rootScope, socket, $scope, IssueManager, BoardManager) {
  var that = this;

  $scope.board = BoardManager.getBoard();

  // That's why I hate ui-select
  $scope.multipleOptions = {};
  $scope.multipleOptions.selectedRepositories = [];
  $scope.multipleOptions.selectedIssues = [];

  $scope.$watch("multipleOptions.selectedRepositories", function() {
    BoardManager.changeRepositories($scope.multipleOptions.selectedRepositories);
  });

  $scope.click = function() {
    _.forEach(BoardManager.board.repositories[0].issues, function(issue){
      issue.status = "0 - Backlog";
    });
  }

  $scope.boardSortOptions = {
    containment: '#board',
    itemMoved: function(event) {
      var issue = event.source.itemScope.issue;
      var column = event.dest.sortableScope.$parent.column;
      IssueManager.changeIssueStatus(issue, column.label);
    }
  };

});
