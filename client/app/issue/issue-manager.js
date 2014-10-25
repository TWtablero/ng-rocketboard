'use strict';

angular.module('rocketBoardApp').service('IssueManager', function(IssueRepository, Socket, GithubApi, $http) {
  var that = this;

  this.changeStatus = function(issue, status) {
    var oldStatus = issue.status;
    issue.status = status;

    return IssueRepository.removeLabel(issue, oldStatus).then(function() {
      return that.addLabel(issue, issue.status);
    });
  };

  this.addLabel = function(issue, label) {
    return IssueRepository.addLabel(issue, label).then(function(res) {
      issue.labels = res.data;
      Socket.emit('change:issue', issue);
    });
  };

  this.findByRepository = function(repository) {
    return IssueRepository.findByRepository(repository);
  };

  this.assignToUser = function(issue, user) {
    issue.assignee = user;

    return IssueRepository.update({
      assignee: user.login
    }).then(function() {
      Socket.emit('change:issue', issue);
    });
  };

});
