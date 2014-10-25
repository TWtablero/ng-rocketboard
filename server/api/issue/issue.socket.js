'use strict';

exports.register = function(socket) {
   socket.on('change:issue', function(issue) {

    socket.broadcast.emit('issue:changed', {
      issue: issue
    });

  });
};
