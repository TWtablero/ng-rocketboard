var app = angular.module('rockboardApp');

app.factory('GithubApi', function(LoginService) {
  var that = this;

  this.url = "https://api.github.com";

  this.appendToken = function(url) {
    //TODO: I'm sorry about this response_id to remove cache. 
    return url + "?per_page=100&response_id=" + Math.random().toString(36).substring(7) + "&access_token=" + LoginService.getToken();
  };

  return {

    addLabelUrl: function(issue) {
      var addLabelUrl = issue.url + "/labels"
      return that.appendToken(addLabelUrl);
    },

    removeLabelUrl: function(issue, label) {
      var removeLabelUrl = issue.url + "/labels/" + label;
      return that.appendToken(removeLabelUrl);
    },

    issuesUrl: function(repository) {
      var issuesUrl = that.url + "/repos/" + repository.owner.login + "/" + repository.name + "/issues";
      return that.appendToken(issuesUrl);
    },

    userRepositoriesUrl: function(){
      console.log(that.url + that.appendToken("/user/repos"));
      return that.appendToken(that.url + "/user/repos");
    }

  }

});
