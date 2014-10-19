var app = angular.module("rockboardApp");

app.factory('BoardManipulator', function() {
  var that = this;

  that.addIssueToColumn = function(board, issue) {
    _.forEach(board.columns, function(col) {
      if (_.contains(_.pluck(issue.labels, "name"), col.label)) {
        issue.status = col.label;
        col.issues.push(issue);
      } 
    });
    if(!issue.status)
    board.withoutStatusIssues.push(issue);
  }

  return {
    addColumn: function(board, columnName, columnTag) {
      board.columns.push(new Column(columnName, columnTag));
    },

    addIssueToColumn: that.addIssueToColumn,

    removeIssueFromColumn: function(board, column, issue) {
      _.forEach(board.columns, function(col) {
        if (col.name === column.name) {
          col.issues.splice(col.issues.indexOf(issue), 1);
        }
      });
    },
    
    addIssues: function(board, issues, repository) {
      _.forEach(issues, function(issue) {
        that.addIssueToColumn(board, issue);
      });
    }
  };
});
