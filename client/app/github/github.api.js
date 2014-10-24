var app = angular.module('rocketBoardApp');

app.factory('GithubApi', function(LoginService) {
  var that = this;

  this.url = "https://api.github.com";

  this.appendPerPage = function(url) {
    //TODO: I'm sorry about this response_id to remove cache. 
    return url + "?per_page=100&response_id=" + Math.random().toString(36).substring(7);
  };

  return {

    addLabelUrl: function(issue) {
      var addLabelUrl = issue.url + "/labels"
      return addLabelUrl;
    },

    removeLabelUrl: function(issue, label) {
      var removeLabelUrl = issue.url + "/labels/" + label;
      return removeLabelUrl;
    },

    issuesUrl: function(repository) {
      var issuesUrl = that.url + "/repos/" + repository.owner.login + "/" + repository.name + "/issues";
      return that.appendPerPage(issuesUrl);
    },

    userRepositoriesUrl: function(){
      return that.appendPerPage(that.url + "/user/repos");
    },

    userUrl: function(){
      return that.url + "/user";
    },

    assignUrl: function(issue, user){
      return issue.url + "?assignee=" + user.login;
    }

  }

});
