function Repository(username, name) {
  return {
    username: username,
    name: name,
    issues: []
  }
}

function Board(name, numberOfColumns) {
  return {
    name: name,
    numberOfColumns: numberOfColumns,
    columns: [],
    withoutStatusIssues: [],
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

