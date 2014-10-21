'use strict';

exports.register = function(socket, socketio) {
   socket.on('change:issue', function(issue) {

    console.log('recieved issue', JSON.stringify(issue));

    console.log('broadcasting message');

    socketio.sockets.emit('issue:changed', {
      issue: issue
    });

    console.log('broadcast complete');
  });
};
