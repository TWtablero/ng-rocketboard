function Board(name, numberOfColumns) {
  return {
    name: name,
    numberOfColumns: numberOfColumns,
    columns: [],
    withoutStatusIssues: [],
    repositories: []
  }
}

function Column(name, label) {
  return {
    label: label,
    name: name,
    issues: []
  };
}

