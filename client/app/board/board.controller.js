'use strict';

angular.module('rockboardApp').controller('BoardController', function($scope, BoardFactory,GithubRepository, RepositoryFacade, BoardManipulator, RepositoryManager) {

  $scope.board = BoardFactory.createSpringBoard();

  GithubRepository.getIssuesFromRepository(RepositoryManager.getRepository()).then(function(issues) {
  	BoardManipulator.addIssues($scope.board, issues.data, RepositoryManager.getRepository());
  });

  $scope.addToBoard = function(){

    console.log($scope.issues);

  }

  $scope.boardSortOptions = {

    containment: '#board',

    itemMoved: function(event) {
      var issue = event.source.itemScope.modelValue;
      var column = event.dest.sortableScope.$parent.column;
      RepositoryFacade.changeIssueLabel(issue, column.label);      
    },
    
    orderChanged: function(event) {}
  };

});
