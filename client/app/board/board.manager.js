var app = angular.module("rockboardApp");

app.service('BoardManager', function(GithubFacade, BoardFactory) {
  var that = this;

  this.board = BoardFactory.getSprintBoard();

  GithubFacade.fetchRepositories().then(function(res) {
    that.board.repositories = res.data;
  });

  this.addRepository = function(repository) {
    var repository = that.getRepository(repository.id);

    // Get repository issues
    if (!repository.issues) {

      GithubFacade.getIssuesFromRepository(repository).then(function(issues) {
        repository.issues = issues.data;
        that.addIssues(repository);
      });

    } else {
      that.addIssues(repository);
    }

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
      issue.status = status;
      console.log(status);
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
