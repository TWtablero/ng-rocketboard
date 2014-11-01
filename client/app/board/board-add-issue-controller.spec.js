'use strict';

describe('BoardAddIssueController', function() {

  var sandbox, BoardFactory, scope, BoardAddIssueController, $q, IssueManager, BoardManager;

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($controller, $rootScope, _BoardManager_, _IssueManager_, _$modal_, _$q_) {
      scope = $rootScope.$new();
      IssueManager = _IssueManager_;
      BoardManager = _BoardManager_;
      $q = _$q_;

      BoardAddIssueController = $controller('BoardAddIssueController', {
        $scope: scope,
        BoardManager: _BoardManager_,
        IssueManager: _IssueManager_,
        $modal: _$modal_,
        $q: _$q_
      });

      sandbox.stub(IssueManager, 'addLabel', function() {
        var promise = $q.defer();
        promise.resolve();
        return promise.promise;
      });

      sandbox.stub(BoardManager, 'updateIssue', function() {});
    });

  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when initiate controller', function() {

    it('functions used on view should exist', function() {
      scope.showModal.should.exist;
      scope.addToBoard.should.exist;
    });

    it('modal should exist', function() {
      BoardAddIssueController.boardIssueModal.should.exist;
    });

    it('modal should be hide', function() {
      BoardAddIssueController.boardIssueModal.$options.show.should.be.false;
    });

    it('modal should have the correct template', function() {
      BoardAddIssueController.boardIssueModal.$options.template.should.be.equals('app/board/board-add-issue-modal.html');
    });
  });

  describe('when addToBoard', function() {
    var modalSpy;

    beforeEach(function() {
      modalSpy = sandbox.spy(BoardAddIssueController.boardIssueModal.$promise, 'then');

      scope.board = {
        columns: []
      };
      scope.board.columns.push({
        status: '0 - Backlog'
      });
      scope.multipleOptions = {};
      scope.multipleOptions.selectedIssues = [{}, {}];
      scope.addToBoard();
    });

    it('clean selected multiple', function() {
      scope.multipleOptions.selectedIssues.should.be.empty;
    });

    it('hide modal', function() {
      modalSpy.should.have.been.called.once;
    });

    describe('and issues are added', function() {

      it('should addLabel for all issues with label equals columns[0] status', function() {
        _.forEach(scope.multipleOptions.selectedIssues, function(issue) {
          IssueManager.addLabel.should.have.been.calledWith(issue, scope.board.columns[0].status);
        });
      });

      it('should update all issues', function() {
        _.forEach(scope.multipleOptions.selectedIssues, function(issue) {
          BoardManager.updateIssue.should.have.been.calledWith(issue    );
        });
      });

    });

  });

});
