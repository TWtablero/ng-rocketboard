'use strict';

angular.module('rockboardApp').controller('BoardAddIssueController', function($modal, $scope, BoardManipulator, GithubFacade) {
  var that = this;

  this.boardIssueModal = $modal({
    show: false,
    template: 'app/board/board.add.issue.modal.html',
    container: "content",
    placement: 'center',
    scope: $scope,
    animation: "am-fade"
  });

  $scope.addToBoard = function() {
    _.forEach($scope.multipleOptions.selectedIssues, function(issue) {
      GithubFacade.addIssueLabel(issue, $scope.board.columns[0].label).then(function() {
        BoardManipulator.removeIssueWithoutStatus($scope.board, issue);
        BoardManipulator.addIssueToColumn($scope.board, issue);
      });
    });
    $scope.multipleOptions.selectedIssues.splice(0);
    that.boardIssueModal.$promise.then(that.boardIssueModal.hide);
  };

  $scope.showModal = function() {
    that.boardIssueModal.$promise.then(that.boardIssueModal.show);
  };

});