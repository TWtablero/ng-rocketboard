'use strict';

angular.module('rockboardApp').controller('BoardController', function($rootScope, socket, $scope, BoardManager) {
  var that = this;

  $scope.board = BoardManager.getBoard();

  // That's why I hate ui-select
  $scope.multipleOptions = {};
  $scope.multipleOptions.selectedRepositories = [];
  $scope.multipleOptions.selectedIssues = [];

  $scope.$watch("multipleOptions.selectedRepositories", function() {
    BoardManager.changeRepositories($scope.multipleOptions.selectedRepositories);
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
