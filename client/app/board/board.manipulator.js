var app = angular.module("rockboardApp");

app.service('BoardManipulator', function(socket, ColorPicker) {
  var that = this;
  that.repositories = [];

  socket.socket.on('issue:changed', function(res) {
    issue = res.issue;
  });

  this.getBoard = function() {
    return that.board;
  };

  this.addIssueToColumn = function(issue) {
    _.forEach(that.getBoard().columns, function(col) {
      if (issue.status == col.label || _.contains(_.pluck(issue.labels, "name"), col.label)) {
        issue.status = col.label;
        col.issues.push(issue);
      }
    });

    if (!issue.status)
      that.getBoard().withoutStatusIssues.push(issue);
  };

  this.addIssues = function(repository) {
    _.forEach(repository.issues, function(issue) {
      issue.repository = repository;
      that.addIssueToColumn(that.getBoard(), issue);
    });
  };

  this.removeIssueFromColumn = function(column, issue) {
    _.forEach(that.getBoard().columns, function(col) {
      if (col.name === column.name) {
        col.issues.splice(col.issues.indexOf(issue), 1);
      }
    });
  };

  this.removeIssueWithoutStatus = function(issue) {
    that.getBoard().withoutStatusIssues.splice(that.getBoard().withoutStatusIssues.indexOf(issue), 1);
  };

  // Not proud of this either
  this.cleanBoard = function(repositories) {
    _.forEach(that.getBoard().columns, function(col) {
      col.issues.splice(0);
    });
    that.getBoard().repositories.splice(0);
    that.getBoard().withoutStatusIssues.splice(0);
  };

  this.addColumn = function(columnName, columnTag) {
    that.getBoard().columns.push(new Column(columnName, columnTag));
  };

  this.addRepository = function(board, repository) {
    if (!repository.color)
      repository.color = ColorPicker.getNextColor();
    board.repositories.push(repository);
    that.addIssues(board, repository);
  };

  this.setBoard = function(board) {
    that.board = board;
    _.forEach(that.board.columns, function(column) {
      that.addColumn(column.name, column.label);
    });
  };

});
