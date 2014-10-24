var app = angular.module("rockboardApp");

app.service('IssueManager', function(GithubRepository, Socket) {
  var that = this;

  this.changeStatus = function(issue, status) {
    var oldStatus = issue.status;
    issue.status = status;

    return GithubRepository.removeLabelFromIssue(issue, oldStatus).then(function() {
      return that.addLabel(issue, issue.status);
    });
  };

  this.addLabel = function(issue, label) {
    return GithubRepository.addLabelOnIssue(issue, label).then(function(res) {
        issue.labels = res.data;
        Socket.emit('change:issue', issue);
      });
  };

  this.getListFromRepository = function(repository) {
    return GithubRepository.getIssuesFromRepository(repository);
  };

});
