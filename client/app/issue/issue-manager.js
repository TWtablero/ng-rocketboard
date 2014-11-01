'use strict';

angular.module('rocketBoardApp').service('IssueManager', function(IssueRepository, Socket) {
  var that = this;

  this.changeStatus = function(issue, status) {
    var oldStatus = issue.status;
    // I don't want to wait remove to change status on screen
    issue.status = status;

    return IssueRepository.removeLabel(issue, oldStatus).then(function() {
      return that.addLabel(issue, status);
    });
  };

  this.addLabel = function(issue, label) {
    issue.status = label;
    return IssueRepository.addLabel(issue, label).then(function(res) {
      issue.labels = res.data;
      Socket.emit('change:issue', issue);
    });
  };

  this.findByRepository = function(repository) {
    return IssueRepository.findByRepository(repository);
  };

  this.removeAssign = function(issue) {
    issue.assignee = null;

    return IssueRepository.update(issue, {
      assignee: null
    }).then(function() {
      Socket.emit('change:issue', issue);
    });
  };

  this.assign = function(issue, user) {
    issue.assignee = user;

    return IssueRepository.update(issue, {
      assignee: user.login
    }).then(function() {
      Socket.emit('change:issue', issue);
    });
  };

  this.close = function(issue) {
    return IssueRepository.update(issue, {
      state: 'closed'
    }).then(function() {
      Socket.emit('change:issue', issue);
    });
  };

});
