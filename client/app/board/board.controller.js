'use strict';

angular.module('rockboardApp').controller('BoardController', function(Socket, $scope, RepositoryManager, IssueManager, BoardManager) {
  var that = this;

  // That's why I hate ui-select
  $scope.multipleOptions = {};
  $scope.multipleOptions.selectedRepositories = [];
  $scope.multipleOptions.selectedIssues = [];

  RepositoryManager.getList().then(function(res) {
    $scope.board = BoardManager.makeBoard(res.data);
  });

  $scope.test = function(){
    $scope.board.columns.splice(0,1);
  }

  $scope.$watch("multipleOptions.selectedRepositories", function(newValue, oldValue) {
    if($scope.board)
      RepositoryManager.getRepositoriesIssues($scope.multipleOptions.selectedRepositories).then(function() {
        BoardManager.changeRepositories($scope.multipleOptions.selectedRepositories);
      });
  });

  $scope.boardSortOptions = {
    itemMoved: function(event) {
      var issue = event.source.itemScope.issue;
      var column = event.dest.sortableScope.$parent.column;
      IssueManager.changeStatus(issue, column.status);
      BoardManager.updateIssue(issue, column.status);
    },
    orderChanged: function() {

    },
    dragEnd: function(event) {}
  };

});
