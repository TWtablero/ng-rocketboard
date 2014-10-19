function Board(name, numberOfColumns) {
  return {
    name: name,
    numberOfColumns: numberOfColumns,
    columns: [],
    withoutStatusIssues: [],
    repositories: [],
    getColumn: function(tag) {
      return _.findWhere(this.columns, {
        tag: tag
      });
    }
  }
}

function Column(name, label) {
  return {
    label: label,
    name: name,
    issues: []
  };
}

