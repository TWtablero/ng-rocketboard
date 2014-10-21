var app = angular.module("rockboardApp");

app.service('IssueManager', function(GithubFacade, BoardFactory, socket, BoardManager) {
  var that = this;

  socket.on("issue:changed", function (res) {
  	BoardManager.updateIssue(res.issue);
  });

  this.changeIssueStatus = function(issue, status) {
    var oldStatus = issue.status;
    issue.status = status;

    console.log("deleta " + oldStatus)
    console.log("adiciona" + status)
    GithubFacade.changeIssueLabel(issue, oldStatus);
      BoardManager.updateIssue(issue);
      socket.emit('change:issue', issue);
  };

});
