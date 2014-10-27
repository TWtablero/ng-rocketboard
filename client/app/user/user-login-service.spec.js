describe('UserLoginService', function() {

  var UserLoginService;
  var loginToken = "token";

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    inject(function(_UserLoginService_) {
      UserLoginService = _UserLoginService_;
    });
  });

  describe('when login', function() {

    beforeEach(function() {
      UserLoginService.login(loginToken);
    });

    it('should set token', function() {
      UserLoginService.getToken().should.be.equals(loginToken);
    });

    it('expect isLoggedIn to be true', function() {
      expect(UserLoginService.isLoggedIn()).to.be.true;
    });

  });

  describe('when logout', function() {

    beforeEach(function() {
      UserLoginService.logOut();
    });

    it('expect token to be null', function() {
      expect(UserLoginService.getToken()).be.equals(null);
    });

    it('expect isLoggedIn to be false', function() {
      expect(UserLoginService.isLoggedIn()).to.be.false;
    });

  });

});
