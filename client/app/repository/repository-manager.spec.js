describe('RepositoryManager', function() {

  var sandbox, RepositoryManager, RepositoryRepository, IssueManager;

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function(_RepositoryManager_, _RepositoryRepository_, _IssueManager_, _$q_) {
      RepositoryManager = _RepositoryManager_;
      RepositoryRepository = _RepositoryRepository_;
      IssueManager = _IssueManager_;
      $q = _$q_;
    });

    sandbox.stub(RepositoryRepository, "findList", function() {});
    sandbox.stub(IssueManager, "findByRepository", function() {
      return $q.defer().promise;
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when method findList called', function() {

    beforeEach(function() {
      RepositoryManager.findList()
    });

    it('should call findList on Repository', function() {
      RepositoryRepository.findList.should.be.called;
    });

  });

  describe('when populate issues', function() {

    describe('and repository have issues', function() {
      var repositoryPromise;
      var repository = {
        issues: [{
          issue: 1
        }, {
          issue: 2
        }]
      }

      beforeEach(function() {
        repositoryPromise = RepositoryManager.populateIssues(repository);
      });

      it('should return issues', function() {
        repositoryPromise.$$state.value.issues.should.to.be.equals(repository.issues);
      });

    });

    describe('and repository dont\'t have issues', function() {

      var repository = {};

      beforeEach(function() {
        RepositoryManager.populateIssues(repository);
      });

      it('should find issues on Manager', function() {
        IssueManager.findByRepository.should.have.been.calledWith(repository);
      });

    });

  });

  describe('when populate issues on repositories', function() {

    beforeEach(function() {
      sandbox.stub(RepositoryManager, "populateIssues", function() {
        var promise = $q.defer();
        promise.resolve();
        return promise.promise;
      });
    });

    describe('and repositories not empty', function() {

      var repositories = [{
        r: 1
      }, {
        r: 2
      }];

      var promiseReturn;

      beforeEach(function() {
        promiseReturn = RepositoryManager.populateRepositoriesIssues(repositories);
      });

      it('should call populate ' + repositories.length + ' times', function() {
        RepositoryManager.populateIssues.should.have.callCount(repositories.length);
      });

      it('expect return to be a promise', function() {
        expect(promiseReturn.$$state).to.exist;
      });
    });

    describe('and repositories is empty', function() {

      var repositories = [];

      var promiseReturn;

      beforeEach(function() {
        promiseReturn = RepositoryManager.populateRepositoriesIssues(repositories);
      });

      it('expect return to be a promise', function() {
        expect(promiseReturn.$$state).to.exist;
      });
    });

  });

});
