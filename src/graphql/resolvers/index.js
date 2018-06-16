const Mutation = require('./mutation');
const Query = require('./query');
const Subscription = require('./subscription');

module.exports = {
  Query: {
    messages: Query.getAllMessages,
    rooms: Query.getAllRooms,
  },
  Mutation: {
    createMessage: Mutation.createMessage,
  },
  Subscription: {
    messageCreated: {
      subscribe: Subscription.messageCreated,
    },
  },
};
