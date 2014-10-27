describe('UserRepository', function() {

  var sandbox, UserRepository;

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function(_UserRepository_, _$http_) {
      UserRepository = _UserRepository_;
      $http = _$http_;
    });

    sandbox.stub($http, "get", function() {});
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when method find called', function() {

    beforeEach(function() {
      UserRepository.find()
    });

    it('should call http with correct endpoint', function() {
      $http.get.should.be.calledWith('https://api.github.com/user');
    });

  });

});
