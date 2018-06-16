const CHANNEL_MESSAGE_CREATE = 'Message Created';

const messageCreate = (root, args, context) => {
  const { pubsub } = context;
  return pubsub.asyncIterator(CHANNEL_MESSAGE_CREATE);
};

module.exports = {
  messageCreate,
};
