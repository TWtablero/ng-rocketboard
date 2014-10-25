'use strict';

angular.module('rocketBoardApp').service('UserManager', function(UserRepository) {

  this.find = function(){
  	return UserRepository.find();
  };

});
