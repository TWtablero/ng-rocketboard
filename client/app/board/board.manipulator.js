var app = angular.module("rockboardApp");

app.service('BoardManipulator', function(socket, ColorPicker) {
  var that = this;
  that.repositories = [];

  socket.socket.on('issue:changed', function(res) {
    issue = res.issue;
    issue.status = that.getIssueStatus(issue);

    that.removeIssueFromColumn(issue);
    that.addIssueToColumn(issue);
  });

  this.getBoard = function() {
    return that.board;
  };

  this.addIssueToColumn = function(issue) {
    _.forEach(that.getBoard().columns, function(col) {
      if (issue.status == col.label) {
        issue.status = col.label;
        col.issues.push(issue);
      }
    });

    if (!issue.status)
      that.getBoard().withoutStatusIssues.push(issue);
  };

  this.addIssues = function(repository) {
    _.forEach(repository.issues, function(issue) {
      issue.repository = _.omit(repository, "issues");
      issue.status = issue.status || that.getIssueStatus(issue);
      that.addIssueToColumn(issue);
    });

  };

  this.getIssueStatus = function(issue) {
    var status = null;

    _.forEach(that.getBoard().columns, function(col) {
      if (_.contains(_.pluck(issue.labels, "name"), col.label)) {
        status = col.label;
      }
    });

    return status;

  };

  this.removeIssueFromColumn = function(issue) {
    _.forEach(that.getBoard().columns, function(col) {
      var index = _.findIndex(col.issues, {
        id: issue.id
      });
      if (index > -1) {
        col.issues.splice(col.issues.indexOf(index), 1);
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

  this.addRepository = function(repository) {
    that.changeBackground(repository);
    that.getBoard().repositories.push(repository);
    that.addIssues(repository);
  };

  this.setBoard = function(board) {
    that.board = board;
  };

  this.changeBackground = function(repository) {
    if (!repository.color)
      repository.color = ColorPicker.getNextColor();
    $("span:contains('" + repository.name + "')").closest(".ui-select-match-item").css("background", repository.color);
  };

});
