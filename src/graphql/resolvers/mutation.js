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
    userHashed,
  }).then((result) => {
    pubsub.publish(CHANNEL_MESSAGE_CREATE, { messageCreated: message.dataValues });
    return result;
  });
};

module.exports = {
  createMessage,
};
