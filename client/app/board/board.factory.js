var app = angular.module("rockboardApp");

app.service('BoardFactory', ['BoardManipulator', function(BoardManipulator) {
  var that = this;

  this.springBoard = {
    "name": "Spring Board",
    "numberOfColumns": 4,
    "columns": [{
      "label": "0 - Backlog",
      "name": "Backlog",
      "issues": []
    },{
      "label": "1 - Ready",
      "name": "Ready",
      "issues": []
    },  {
      "label": "2 - Development",
      "name": "Development",
      "issues": []
    }, {
      "label": "3 - Quality Assurance",
      "name": "Quality Assurance",
      "issues": []
    }]
  }

  return {
    createSpringBoard: function() {
      var board = new Board(that.springBoard.name, that.springBoard.numberOfColumns);
      BoardManipulator.setBoard(board);

      _.forEach(that.springBoard.columns, function(column) {
        BoardManipulator.addColumn(column.name, column.label);
      });
      
      return BoardManipulator.getBoard();
    },
  }

}]);
