var app = angular.module("rockboardApp");

app.factory('BoardManipulator', function(ColorPicker) {
  var that = this;
  that.repositories = [];

  that.addIssueToColumn = function(board, issue) {
    _.forEach(board.columns, function(col) {
      if (issue.status == col.label || _.contains(_.pluck(issue.labels, "name"), col.label)) {
        issue.status = col.label;
        col.issues.push(issue);
      }
    });

    if (!issue.status)
      board.withoutStatusIssues.push(issue);
  };

  this.addIssues = function(board, repository) {
    _.forEach(repository.issues, function(issue) {
      issue.repository = repository;
      that.addIssueToColumn(board, issue);
    });
  };

  this.removeIssueFromColumn = function(board, column, issue) {
    _.forEach(board.columns, function(col) {
      if (col.name === column.name) {
        col.issues.splice(col.issues.indexOf(issue), 1);
      }
    });
  };

  this.removeIssueWithoutStatus = function(board, issue) {
    board.withoutStatusIssues.splice(board.withoutStatusIssues.indexOf(issue), 1);
  };

  // Not proud of this either
  this.cleanBoard = function(board, repositories) {
    _.forEach(board.columns, function(col) {
      col.issues.splice(0);
    });
    board.repositories.splice(0);
    board.withoutStatusIssues.splice(0);
  };

  return {
    addColumn: function(board, columnName, columnTag) {
      board.columns.push(new Column(columnName, columnTag));
    },

    addIssueToColumn: that.addIssueToColumn,

    removeIssueFromColumn: this.removeIssueFromColumn,

    addIssues: that.addIssues,

    removeIssueWithoutStatus: that.removeIssueWithoutStatus,

    cleanBoard: that.cleanBoard,

    addRepository: function(board, repository) {
      if(!repository.color)
      repository.color = ColorPicker.getNextColor();
      board.repositories.push(repository);
      that.addIssues(board, repository);
    }

  };
});
