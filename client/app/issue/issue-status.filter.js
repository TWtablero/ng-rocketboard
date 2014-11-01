'use strict';

angular.module('rocketBoardApp').filter('statusFilter', function() {
   return function( issues, status) {
    var filtered = [];

    if(status === undefined || status === ''){
      return issues;
    }

    _.forEach(issues, function(issue) {          
       if(issue.status === status){
        filtered.push(issue);
       }
    });

    return filtered;
  };
});