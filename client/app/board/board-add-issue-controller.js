'use strict';

angular.module('rocketBoardApp').controller('BoardAddIssueController', function(BoardManager, $modal, $scope, IssueManager) {
  var that = this;

  this.boardIssueModal = $modal({
    show: false,
    template: 'app/board/board.add.issue.modal.html',
    container: 'content',
    placement: 'center',
    scope: $scope,
    animation: 'am-fade'
  });

  $scope.addToBoard = function() {
    _.forEach($scope.multipleOptions.selectedIssues, function(issue) {
      issue.status = $scope.board.columns[0].status;
      IssueManager.addLabel(issue, $scope.board.columns[0].status).then(function() {
        BoardManager.updateIssue(issue);
      });
    });
    $scope.multipleOptions.selectedIssues.splice(0);
    that.boardIssueModal.$promise.then(that.boardIssueModal.hide);
  };

  $scope.showModal = function() {
    that.boardIssueModal.$promise.then(that.boardIssueModal.show);
  };

});
