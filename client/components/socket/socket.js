'use strict';

angular.module('rocketBoardApp').factory('Socket', function(socketFactory) {

  var ioSocket = io('', {
    path: '/socket.io-client'
  });

  var socket = socketFactory({
    ioSocket: ioSocket
  });

  socket.forward('issue:changed');

  return socket;
});
