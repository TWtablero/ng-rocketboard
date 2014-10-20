var app = angular.module("rockboardApp");

app.service('ColorPicker', function() {
  var that = this;
  that.index = 0;
  this.colors = ["#69b4df", "#3cb878", "#ef689e", "red", "blue", "pink"]

  return {
    getNextColor: function() {
      return that.colors[that.index++];
    },
  }

});
