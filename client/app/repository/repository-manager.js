'use strict';

angular.module('rocketBoardApp').service('RepositoryManager', function($q, IssueManager, RepositoryRepository) {

  this.populateRepositoriesIssues = function(repositories) {
    var that = this;
    var promises = [];

    _.forEach(repositories, function(repository) {
      promises.push(that.populateIssues(repository));
    });

    return $q.all(promises);
  };

  this.populateIssues = function(repository) {

    // Already populated
    if (repository.issues) {
      // Just for precaution, I'm not sure if I need this, buuuuut...
      var promise = $q.defer();
      promise.resolve(repository);
      return promise.promise;
    } else {
      return IssueManager.findByRepository(repository).then(function(res) {
        repository.issues = res.data;
      });
    }
  };

  this.findList = function() {
    return RepositoryRepository.findList();
  };

});
