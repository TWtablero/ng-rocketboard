var app = angular.module('rocketBoardApp');

app.filter('statusFilter', function() {
   return function( issues, status) {
    var filtered = [];

    if(status === undefined || status === ''){
      return issues;
    }

    _.forEach(issues, function(issue) {          
       if(issue.status && issue.status == status){
        filtered.push(issue);
       }
    });

    return filtered;
  };
});