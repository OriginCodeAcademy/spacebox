'use strict';

const eventHandler = (socket, event) => {
  socket.emit('event:ack', event);
};

const actionHandler = (socket, action, app) => {
  const {type, payload} = action;
  switch (type) {
    case 'CONNECT_ROOM':
      socket.broadcast.emit('add_to_room', true);
      break;
    case 'CONNECT_ROOM_FULFILLED':
      socket.broadcast.emit('add_to_room', true);
      break;
    default:
      break;
  }
};

module.exports = {eventHandler, actionHandler};
