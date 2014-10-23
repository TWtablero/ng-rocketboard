var app = angular.module("rockboardApp");

app.service('BoardManager', function(IssueManager, Socket, BoardFactory) {
  var that = this;

  Socket.on("issue:changed", function(res) {
    that.updateIssue(res.issue);
  });

  this.updateIssue = function(issue, status) {

    if (this.getRepository(issue.repository.id)) {

      var issueReference = this.getRepository(issue.repository.id).issues[_.findIndex(this.getRepository(issue.repository.id).issues, {
        id: issue.id
      })];

      // Need to 
      issue.repository.color = issueReference.repository.color;

      //Update issue on repository
      issueReference = issue;

      // If exist update issue on board
      if (_.findIndex(that.board.issues, {
          id: issue.id
        }) > -1) {

        this.board.issues[_.findIndex(that.board.issues, {
          id: issue.id
        })] = issue;

      }

    }
  };

  this.makeBoard = function(repositories) {
    that.board = BoardFactory.makeBoard(repositories);
    return that.board;
  };

  this.addRepository = function(repository) {
    var repository = that.getRepository(repository.id);
    that.addIssues(repository);

    //Not proud
    $("span").filter(function(){ return $(this).text() == repository.name  }).closest(".ui-select-match-item").css("background", repository.color);
  };

  this.changeRepositories = function(repositories) {
    // I know, you know, we all know.
    that.board.issues.splice(0);
    _.forEach(repositories, that.addRepository);
  };

  this.getRepository = function(id) {
    return _.find(that.board.repositories, {
      id: id
    });
  };

  this.addIssues = function(repository) {

    _.forEach(repository.issues, function(issue) {
      var status = null;
      _.forEach(that.board.columns, function(col) {
        if (_.contains(_.pluck(issue.labels, "name"), col.status)) {
          status = col.status;
        }
      });
      issue.repository = _.omit(repository, "issues");
      issue.status = status || "nostatus";
      that.board.issues.push(issue);
    });
  };

  this.setBoard = function() {
    that.board = board;
  };

  this.getBoard = function() {
    return that.board;
  };

});
