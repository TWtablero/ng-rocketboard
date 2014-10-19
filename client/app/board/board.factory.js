var app = angular.module("rockboardApp");

app.service('BoardFactory', ['BoardManipulator', function(BoardManipulator) {
  var that = this;

  this.springBoard = {
    "name": "Spring Board",
    "numberOfColumns": 4,
    "columns": [{
      "label": "backlog",
      "name": "Sprint Backlog",
      "issues": []
    }, {
      "label": "developing",
      "name": "Developing",
      "issues": []
    }, {
      "label": "qa",
      "name": "QA",
      "issues": []
    }, {
      "label": "done",
      "name": "Done",
      "issues": []
    }]
  }

  return {
    createSpringBoard: function() {
      var _board = new Board(that.springBoard.name, that.springBoard.numberOfColumns);
      angular.forEach(that.springBoard.columns, function(column) {
        BoardManipulator.addColumn(_board, column.name, column.label);
      });
      return _board;
    },
  }

}]);
