describe('RepositoryColorPicker', function() {

  var RepositoryColorPicker;
  var colors = [];

  beforeEach(module('rocketBoardApp'));

  beforeEach(function() {
    inject(function(_RepositoryColorPicker_) {
      RepositoryColorPicker = _RepositoryColorPicker_;
    });
  });

  afterEach(function() {
    colors.splice(0);
  })

  describe('when need 200 colors', function() {

    beforeEach(function() {
      for (i = 0; i < 200; i++) {
        colors.push(RepositoryColorPicker.getNextColor());
      };
    });

    it('should have 200 colors', function() {
      colors.length.should.be.equals(200);
    });

  });

  describe('when need 24 colors', function() {

    beforeEach(function() {
      for (i = 0; i < 24; i++) {
        colors.push(RepositoryColorPicker.getNextColor());
      };
    });

    it('should have 24 colors', function() {
      colors.length.should.be.equals(24);
    });

    it('should have 24 different colors', function() {
      while (colors.length) {
        var color = colors.pop();
        colors.should.not.include(color);
      }
    });

  });

});
