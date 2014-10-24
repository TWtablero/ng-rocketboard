'use strict';

angular.module('rocketBoardApp').controller('BoardController', function(Socket, UserManager, $rootScope, $scope, RepositoryManager, IssueManager, BoardManager) {
  var that = this;

  // That's why I hate ui-select
  $scope.multipleOptions = {};
  $scope.multipleOptions.selectedRepositories = [];
  $scope.multipleOptions.selectedIssues = [];

  // Put on login ?
  RepositoryManager.getList().then(function(res) {
    $scope.board = BoardManager.makeBoard(res.data);
  });

  $scope.assignMe = function(issue) {
    IssueManager.assignIssueToUser(issue, $rootScope.user);
    BoardManager.updateIssue(issue);
  };

  $scope.$watch("multipleOptions.selectedRepositories", function(newValue, oldValue) {
    if ($scope.board)
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
