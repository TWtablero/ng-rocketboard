function Board(name, numberOfColumns) {
  return {
    name: name,
    numberOfColumns: numberOfColumns,
    columns: [],
    withoutStatusIssues: [],
    repositories: [],
    repositoriesAdded: [],
    issues: []
  }
}

function Column(name, status) {
  return {
    status: status,
    name: name
  };
}

