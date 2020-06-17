// import { Room } from '../../models/Room';
// import { Message } from '../../models/Message';
const Room = require('../../models/Room').Room;
const Message = require('../../models/Message').Message;
const { getPubSubRoomChannelMessageCreated } = require('../../utils');

const createMessage = (root, args, context) => {
  const { pubsub } = context;
  const { input } = args;
  const { message, username, roomId } = input;
  return Message.create({
    message,
    roomId,
    username,
  }).then((messageCreated) => {
    pubsub.publish(getPubSubRoomChannelMessageCreated(roomId), { messageCreated: messageCreated.dataValues });
    return messageCreated;
  });
};

const createRoom = (root, args, context) => {
  const { name } = args;
  return Room.create({
    name,
  }).then((roomCreated) => {
    return roomCreated;
  });
}

module.exports = {
  createMessage,
  createRoom,
};
