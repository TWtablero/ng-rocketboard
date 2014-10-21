var app = angular.module("rockboardApp");

app.service('BoardFactory', function(GithubFacade, ColorPicker) {
  var that = this;

  this.sprintBoard = {
    "name": "Spring Board",
    "numberOfColumns": 4,
    "columns": [{
      "label": "0 - Backlog",
      "name": "Backlog"
    }, {
      "label": "1 - Ready",
      "name": "Ready"
    }, {
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

      GithubFacade.fetchRepositories().then(function(res) {

        _.forEach(res.data, function(repository){
          repository.color = ColorPicker.getNextColor();
          board.repositories.push(repository);
        });

      });

      _.forEach(that.sprintBoard.columns, function(column) {
        board.columns.push(new Column(column.name, column.label));
      });

      return board;
    },
  }

});
