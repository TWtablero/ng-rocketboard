'use strict';

angular.module('rocketBoardApp').service('RepositoryColorPicker', function() {
  var that = this;
  that.index = -1;
  this.colors = _.shuffle(['#69b4df', '#3cb878', '#ef689e', , '#D65C5C', '#E05252', '#7A1F1F', '#821717', '#D6995C', '#E09952', '#4D3319', '#4D7326', '#33570F', '#1F7A1F', '#1F471F', '#244242', '#29A3A3', '#3D99F5', '#264C73', '#053361', '#141452', '#7A1F7A', '#73264D', '#610533', '#4D1933']);

  return {
    getNextColor: function() {
      that.index = ++that.index >= that.colors.length ? 0 : that.index;
      return that.colors[that.index];
    },
  };

});
