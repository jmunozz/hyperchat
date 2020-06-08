const Message = require('../../models/Message');

const CHANNEL_MESSAGE_CREATE = 'Message Created';

const createMessage = (root, args, context) => {
  const { pubsub } = context;
  const { message, room, username } = args;
  return Message.create({
    message,
    room,
    username,
  }).then((messageCreated) => {
    pubsub.publish(CHANNEL_MESSAGE_CREATE, { messageCreated: messageCreated.dataValues });
    return messageCreated;
  });
};

module.exports = {
  createMessage,
};
