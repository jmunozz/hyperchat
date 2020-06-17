// import { Message} from '../../models/Message';
// import { Room } from '../../models/Room';
const Room = require('../../models/Room').Room;
const Message = require('../../models/Message').Message;

const getRoomMessages = (root, args, context) => {
  const { roomId } = args;
  return Message.findAll({ include: { as: 'room', model: Room }, where: { roomId } })
};

const getAllRooms = () => Room.findAll();

module.exports = {
  getRoomMessages,
  getAllRooms,
};
