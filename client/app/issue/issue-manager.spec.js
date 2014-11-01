describe('IssueManager', function() {

  var sandbox, IssueManager, IssueRepository, Socket;
  var addLabelReturn = {
    data: {
      label: 1
    }
  };

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function(_IssueManager_, _IssueRepository_, _Socket_, _$q_, _$rootScope_) {
      IssueManager = _IssueManager_;
      IssueRepository = _IssueRepository_;
      Socket = _Socket_;
      $q = _$q_;
      $rootScope = _$rootScope_;
    });

    sandbox.stub(IssueRepository, 'removeLabel', function() {
      var promise = $q.defer();
      promise.resolve();
      return promise.promise;
    });

    sandbox.stub(IssueRepository, 'addLabel', function() {
      var promise = $q.defer();
      promise.resolve(addLabelReturn);
      return promise.promise;
    });

    sandbox.stub(IssueRepository, 'findByRepository', function() {});

    sandbox.stub(IssueRepository, 'update', function() {
      var promise = $q.defer();
      promise.resolve(addLabelReturn);
      return promise.promise;
    });

    sandbox.stub(Socket, 'emit', function() {});
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when changeStatus', function() {
    var issue, newStatus;

    beforeEach(function() {
      issue = {
        status: "0 - Backlog"
      };
      newStatus = "1 - Ready";

      sandbox.stub(IssueManager, 'addLabel', function() {});

      IssueManager.changeStatus(issue, newStatus);
      $rootScope.$digest();
    });

    it('issue status should be equals label', function() {
      issue.status.should.be.equals(newStatus);
    });

    it('should call remove label with issues and label', function() {
      IssueRepository.removeLabel.should.be.called;
      IssueRepository.removeLabel.should.be.calledWith(issue, "0 - Backlog");
    });

    it('should call manager addLabel with issue and label', function() {
      IssueManager.addLabel.should.be.called;
      IssueManager.addLabel.should.be.calledWith(issue, newStatus);
    });

  });

  describe('when addLabel', function() {
    var issue, newLabel;

    beforeEach(function() {
      issue = {
        status: "0 - Backlog"
      };
      newLabel = "1 - Ready";

      IssueManager.addLabel(issue, newLabel);
      $rootScope.$digest();

    });

    it('should call repository addLabel', function() {
      IssueRepository.addLabel.should.be.calledWith(issue, newLabel);
    });

    it('should put data on issue labels', function() {
      issue.labels.label.should.be.equals(1);
    });

    it('should emit socket with issue', function() {
      Socket.emit.should.be.called;
      Socket.emit.should.be.calledWith('change:issue', issue);
    });

  });

  describe('when findByRepository', function() {
    var repository = {
      data: "1"
    };

    beforeEach(function() {
      IssueManager.findByRepository(repository);
      $rootScope.$digest();
    });

    it('should ', function() {
      IssueRepository.findByRepository.should.have.been.called;
      IssueRepository.findByRepository.should.have.been.calledWith(repository);
    });

  });

  describe('when removeAssign', function() {
    issue = {
      assignee: {
        id: 1
      }
    };

    beforeEach(function() {
      IssueManager.removeAssign(issue);
      $rootScope.$digest();
    });

    it('expect issue.assignee to be null', function() {
      expect(issue.assignee).to.be.null;
    });

    it('expect repository.update to be called with assignee null', function() {
      IssueRepository.update.should.have.been.calledWith(issue, {
        assignee: null
      });
    });

  });

  describe('when assign', function() {
    issue = {
      assignee: {
        login: 1
      }
    };

    user = {
      name: "Marcio"
    };

    beforeEach(function() {
      IssueManager.assign(issue, user);
      $rootScope.$digest();
    });

    it('expect issue.assignee to be user', function() {
      expect(issue.assignee).to.be.equals(user);
    });

    it('expect repository.update to be called with assignee = user.login', function() {
      IssueRepository.update.should.have.been.calledWith(issue, {
        assignee: user.login
      });
    });

    it('should emit socket with issue', function() {
      Socket.emit.should.be.called;
      Socket.emit.should.be.calledWith('change:issue', issue);
    });

  });

  describe('when close', function() {
    issue = {
      assignee: {
        login: 1
      }
    };

    beforeEach(function() {
      IssueManager.close(issue);
      $rootScope.$digest();
    });

    it('expect repository.update to be called with state = close', function() {
      IssueRepository.update.should.have.been.calledWith(issue, {
        state: 'closed'
      });
    });

    it('should emit socket with issue', function() {
      Socket.emit.should.be.called;
      Socket.emit.should.be.calledWith('change:issue', issue);
    });

  });

});
