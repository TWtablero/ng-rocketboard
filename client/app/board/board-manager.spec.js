describe('BoardManager', function() {

  var sandbox, Socket, BoardFactory, BoardManager;

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function(_Socket_, _BoardFactory_, _BoardManager_, _$q_) {
      Socket = _Socket_;
      BoardFactory = _BoardFactory_;
      BoardManager = _BoardManager_;
      $q = _$q_;
    });

  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when makeBoard', function() {
    var board;
    var repositories = [{
      name: 1
    }, {
      name: 2
    }];

    beforeEach(function() {
      board = BoardManager.makeBoard(repositories);
    });

    it('should have board equals the return', function() {
      BoardManager.getBoard().should.be.equals(board);
    });

  });

  describe('when changeRepositories', function() {
    var addStyleSpy;
    var repo1 = {
      issues: [{
        name: 1
      }]
    };
    var repo2 = {
      issues: [{
        name: 2
      }]
    };
    var repositories = [repo1, repo2];

    beforeEach(function() {
      addStyleSpy = sandbox.spy(BoardManager, "addStyleAndEvents");
      BoardManager.makeBoard(repositories);
      BoardManager.changeRepositories(repositories);
    });

    it('should call addStyleAndEvents for each repo', function() {
      addStyleSpy.should.have.callCount(repositories.length);
    });

    it('should add both issues', function() {
      BoardManager.getBoard().issues.length.should.be.equals(2);
    });

    it('should have issues with status and repository', function() {
      BoardManager.getBoard().issues.should.all.have.property('status');
      BoardManager.getBoard().issues.should.all.have.property('repository');
    });

  });

});
