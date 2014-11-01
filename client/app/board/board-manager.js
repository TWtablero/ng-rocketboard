'use strict';

angular.module('rocketBoardApp').service('BoardManager', function(IssueManager, Socket, BoardFactory) {
  var that = this;

  Socket.on('issue:changed', function(res) {
    that.updateIssue(res.issue);
  });

  // How do I test this monster?
  this.updateIssue = function(issue) {

    var repository = this.getRepository(issue.repository.id);

    if (repository.issues) {

      var issueReference = repository.issues[that.findIndex(repository.issues, issue)];

      //Need to maintain colors 
      issue.repository.color = issueReference.repository.color;

      this.getRepository(issue.repository.id).issues[that.findIndex(repository.issues, issue)] = issue;

      if (that.onBoard(issue) && that.isShowingRepository(repository)) {

        this.board.issues[_.findIndex(that.board.issues, {
          id: issue.id
        })] = issue;

      } else if (that.isShowingRepository(repository)) {
        that.addIssue(issue);
      }
    }
  };

  this.isShowingRepository = function(repository) {
    return _.find(that.board.repositoriesAdded, {
      id: repository.id
    });
  };

  this.findIndex = function(colection, object) {
    return _.findIndex(colection, {
      id: object.id
    });
  };

  this.onBoard = function(issue) {
    return _.findIndex(that.board.issues, {
      id: issue.id
    }) > -1;
  };

  this.makeBoard = function(repositories) {
    that.board = BoardFactory.makeBoard(repositories);
    return that.board;
  };

  this.addRepository = function(repository) {
    var _repository = that.getRepository(repository.id);
    that.board.repositoriesAdded.push(_repository);
    that.addIssues(_repository);
    that.addStyleAndEvents(_repository);
  };

  //Not proud
  that.addStyleAndEvents = function(repository) {
    var repositorySpan = $('span').filter(function() {
      return $(this).text() === repository.name;
    }).closest('.ui-select-match-item');

    repositorySpan.css('background', repository.color);
    repositorySpan.click(function() {
      window.open(repository.html_url);
    });
  };

  this.changeRepositories = function(repositories) {
    // I know, you know, we all know.
    that.board.issues.splice(0);
    that.board.repositoriesAdded.splice(0);
    _.forEach(repositories, that.addRepository);
  };

  this.getRepository = function(id) {
    return _.find(that.board.repositories, {
      id: id
    });
  };

  this.addIssues = function(repository) {
    _.forEach(repository.issues, function(issue) {
      that.addIssue(repository, issue);
    });
  };

  this.addIssue = function(repository, issue) {
    var status = null;
    _.forEach(that.board.columns, function(col) {
      if (_.contains(_.pluck(issue.labels, 'name'), col.status)) {
        status = col.status;
      }
    });
    issue.repository = _.omit(repository, 'issues');
    issue.status = status || null;
    that.board.issues.push(issue);
  };

  this.getBoard = function() {
    return that.board;
  };

});
