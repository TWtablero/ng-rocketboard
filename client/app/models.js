function Board(name, numberOfColumns) {
  return {
    name: name,
    numberOfColumns: numberOfColumns,
    columns: [],
    withoutStatusIssues: [],
    repositories: [],
    issues: []
  }
}

function Column(name, status) {
  return {
    status: status,
    name: name
  };
}

