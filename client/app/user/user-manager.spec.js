describe('UserManager', function() {

  var sandbox, UserManager;

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function(_UserManager_, _UserRepository_) {
      UserManager = _UserManager_;
      UserRepository = _UserRepository_;
    });

    sandbox.stub(UserRepository, "find", function() {});
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when method find called', function() {

    beforeEach(function() {
      UserManager.find()
    });

    it('should call UserRepository find', function() {
      UserRepository.find.should.be.calledWith();
    });

  });

});
