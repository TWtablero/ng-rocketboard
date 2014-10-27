describe('IssueRepository', function() {

  var sandbox, IssueRepository;

  var issue = {
    url: 'https://api.github.com/repos/marcioviegas/agenda/issues/2'
  };

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function(_IssueRepository_, _$http_) {
      IssueRepository = _IssueRepository_;
      $http = _$http_;
    });

    sandbox.stub($http, "get", function() {});
    sandbox.stub($http, "post", function() {});
    sandbox.stub($http, "patch", function() {});
    sandbox.stub($http, "delete", function() {});
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when method findByRepository called', function() {

    var repository = {
      url: 'https://api.github.com/repos/marcioviegas/agenda'
    };

    beforeEach(function() {
      IssueRepository.findByRepository(repository)
    });

    it('should call http with correct endpoint', function() {
      $http.get.should.be.calledWith(repository.url + '/issues');
    });

  });

  describe('when method removeLabel called', function() {

    var label = 'label';

    beforeEach(function() {
      IssueRepository.removeLabel(issue, label)
    });

    it('should call http with correct endpoint', function() {
      $http.delete.should.be.calledWith(issue.url + '/labels/' + label);
    });

  });

  describe('when method update called', function() {

    var update = {
      assignee: "Márcio"
    };

    beforeEach(function() {
      IssueRepository.update(issue, update)
    });

    it('should call http with correct endpoint', function() {
      $http.patch.should.be.calledWith(issue.url, update);
    });

  });

  describe('when method addLabel called', function() {

    var label = "label";

    beforeEach(function() {
      IssueRepository.addLabel(issue, label)
    });

    it('should call http with correct endpoint', function() {
      $http.post.should.be.calledWith(issue.url + '/labels', angular.toJson([label]));
    });

  });

});
