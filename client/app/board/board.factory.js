var app = angular.module("rockboardApp");

app.service('BoardFactory', function() {
  var that = this;

  this.sprintBoard = {
    "name": "Spring Board",
    "numberOfColumns": 4,
    "columns": [{
      "label": "0 - Backlog",
      "name": "Backlog"
    },{
      "label": "1 - Ready",
      "name": "Ready",
      "issues": []
    },  {
      "label": "2 - Development",
      "name": "Development"
    }, {
      "label": "3 - Quality Assurance",
      "name": "Quality Assurance"
    }]
  }

  return {
    getSprintBoard: function() {
      var board = new Board(that.sprintBoard.name, that.sprintBoard.numberOfColumns);

      _.forEach(that.sprintBoard.columns, function(column) {
        board.columns.push(new Column(column.name, column.label));
      });
      
      return board;
    },
  }

});
