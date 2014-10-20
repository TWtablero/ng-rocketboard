'use strict';

angular.module('rockboardApp').controller('BoardAddIssueController', function($modal, $scope, BoardFactory) {
  var that = this;

  this.boardIssueModal = $modal({
    show: false,
    template: 'app/board/board.add.issue.modal.html',
    container: "content",
    placement: 'center',
    scope: $scope,
    animation: "am-fade"
  });

  $scope.showModal = function() {
    that.boardIssueModal.$promise.then(that.boardIssueModal.show);
  };

  $scope.hideModal = function() {
    that.boardIssueModal.$promise.then(that.boardIssueModal.hide);
  };

});
