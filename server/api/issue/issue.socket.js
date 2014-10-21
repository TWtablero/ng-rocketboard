'use strict';

exports.register = function(socket) {
   socket.on('change:issue', function(issue) {

    console.log('recieved issue', JSON.stringify(issue));

    console.log('broadcasting message');

    socket.broadcast.emit('issue:changed', {
      issue: issue
    });

    console.log('broadcast complete');
  });
};
