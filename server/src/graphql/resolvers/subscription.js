const { getPubSubRoomChannelMessageCreated } = require('../../utils');


const messageCreated = (root, args, context) => {
  const { pubsub } = context;
  const { roomId } = args;
  return pubsub.asyncIterator(getPubSubRoomChannelMessageCreated(roomId));
};

module.exports = {
  messageCreated,
};
