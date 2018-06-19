const Message = require('../../models/Message');
const hash = require('hash-string');

const CHANNEL_MESSAGE_CREATE = 'Message Created';

const createMessage = (root, args, context) => {
  const { pubsub } = context;
  const { message, room, userHash } = args;
  const userHashed = hash(userHash);
  return Message.create({
    message,
    room,
    userHash: userHashed,
  }).then((messageCreated) => {
    pubsub.publish(CHANNEL_MESSAGE_CREATE, { messageCreated: messageCreated.dataValues });
    return messageCreated;
  });
};

module.exports = {
  createMessage,
};
