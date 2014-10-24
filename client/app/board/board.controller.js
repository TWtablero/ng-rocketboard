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

  $scope.trigger = function(){
    triggerRocketAnimation()
  }

  $scope.assignMe = function(issue) {
    if (issue.assignee && issue.assignee.id == $rootScope.user.id)
      return;

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
    containment: '#board',
    itemMoved: function(event) {

      var issue = event.source.itemScope.issue;
      var status;

      if (event.dest.sortableScope.$id == 5) {
        status = "5 - Done"
        triggerRocketAnimation();
      } else {
        status = event.dest.sortableScope.$parent.column.status;
      }

      IssueManager.changeStatus(issue, status);
      BoardManager.updateIssue(issue, status);
    },
    orderChanged: function() {

    },
    dragEnd: function(event) {}
  };

});

var triggerRocketAnimation = function() {
  $(".panel-done img.plain").hide();
  $(".panel-done h3").css('opacity', 0);
  $(".panel-done .issues-count").css('opacity', 0);
  $(".panel-done img.colored").show().animate({
    top: '-650px'
  }, 2000, 'easeInBack', function() {
    $(".panel-done img.colored").hide().css('top', 0);

    $(".panel-done h3").text('Liftoff! We Have a Liftoff!');
    $(".panel-done h3").css('color', '#5dc66c');
    $(".panel-done h3").animate({
      opacity: 1
    }, 2000);

    $(".panel-done .check-done").fadeIn(2000, function() {
      $(".panel-done .check-done").hide();

      $(".panel-done h3").css('opacity', 0);
      $(".panel-done h3").text('Drop here to launch');
      $(".panel-done h3").css('color', '#aaa');

      $(".panel-done img.plain").fadeIn(600);
      $(".panel-done h3").animate({
        opacity: 1
      }, 600);
      $(".panel-done .issues-count").animate({
        opacity: 1
      }, 600);
    });
  });
}
