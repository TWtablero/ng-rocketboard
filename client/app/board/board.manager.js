var app = angular.module("rockboardApp");

app.service('BoardManager', function(GithubFacade, BoardFactory) {
  var that = this;

  this.board = BoardFactory.getSprintBoard();

  this.updateIssue = function(issue) {

    if (this.getRepository(issue.repository.id)) {

      console.log(_.findIndex(this.getRepository(issue.repository.id).issues, {
        id: issue.id
      }))

      this.getRepository(issue.repository.id).issues.splice(_.findIndex(this.getRepository(issue.repository.id).issues, {
        id: issue.id
      }), 1);

      this.getRepository(issue.repository.id).issues.push(issue);
      console.log(issue.status)

      if (_.findIndex(that.board.issues, {
          id: issue.id
        }) > -1) {

        this.board.issues.splice(_.findIndex(that.board.issues, {
          id: issue.id
        }), 1);

        that.board.issues.push(issue);
      }

    }
  };

  this.addRepository = function(repository) {
    var repository = that.getRepository(repository.id);

    if (!repository.issues) {
      GithubFacade.getIssuesFromRepository(repository).then(function(issues) {
        repository.issues = issues.data;
        that.addIssues(repository);
      });
    } else {
      that.addIssues(repository);
    }

    //Not proud
    $("span:contains('" + repository.name + "')").closest(".ui-select-match-item").css("background", repository.color);
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
        if (_.contains(_.pluck(issue.labels, "name"), col.label)) {
          status = col.label;
        }
      });
      issue.repository = _.omit(repository, "issues");
      issue.status = status;
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
