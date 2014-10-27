'use strict';

describe('BoardFactory', function() {
  var sandbox, BoardFactory;  

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function(_BoardFactory_) {
      BoardFactory = _BoardFactory_;
    });

  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when makeBoard', function() {
    var repositories = [{
      name: 1
    }, {
      name: 2
    }];

    var board;

    beforeEach(function() {
      board = BoardFactory.makeBoard(repositories);
    });

    it('board should exist', function() {
      board.should.exist;
    });

    it('expect board to have all repositories', function() {
      board.repositories.length.should.be.equals(repositories.length);
    });

    it('board should have 4 columns', function() {
      board.columns.length.should.be.equals(4);
    });

    it('expect all repositories to have colors', function() {
      board.repositories.should.all.have.property('color')
    });

    it('board issues should be empty', function() {
      board.issues.length.should.be.empty;
    });

  });

});
