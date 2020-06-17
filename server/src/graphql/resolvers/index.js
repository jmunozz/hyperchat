const Mutation = require('./mutation');
const Query = require('./query');
const Subscription = require('./subscription');

module.exports = {
  Query: {
    messages: Query.getRoomMessages,
    rooms: Query.getAllRooms,
  },
  Mutation: {
    createMessage: Mutation.createMessage,
    createRoom: Mutation.createRoom,
  },
  Subscription: {
    messageCreated: {
      subscribe: Subscription.messageCreated,
    },
  },
};
