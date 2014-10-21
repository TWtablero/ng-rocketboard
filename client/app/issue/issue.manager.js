var app = angular.module("rockboardApp");

app.service('IssueManager', function(GithubFacade, BoardFactory, socket, BoardManager) {
  var that = this;

  socket.on("issue:changed", function(res) {
    BoardManager.updateIssue(res.issue);
  });

  this.changeIssueStatus = function(issue, status) {
    var oldStatus = issue.status;
    issue.status = status;
    BoardManager.updateIssue(issue);

    GithubFacade.changeIssueLabel(issue, oldStatus).then(function() {
      socket.emit('change:issue', issue);
    });

  };

});
