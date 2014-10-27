describe('RepositoryRepository', function() {

  var sandbox, RepositoryRepository;

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function(_RepositoryRepository_, _$http_) {
      RepositoryRepository = _RepositoryRepository_;
      $http = _$http_;
    });

    sandbox.stub($http, "get", function() {});
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when method findList called', function() {

    beforeEach(function() {
      RepositoryRepository.findList()
    });

    it('should call http with correct endpoint', function() {
      $http.get.should.be.calledWith('https://api.github.com/user/repos');
    });

  });

});
