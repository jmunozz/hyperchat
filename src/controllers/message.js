const Message = require('../models/Message');

/**
 * Post a Message.
 * @param {object} param0 
 */
const createMessage = ({ message, room, userHash }) => {
    return Message.build({
        message, 
        room, 
        userHash,
    }).save()
}
/**
 * Get All Messages.
 */
const getAllMessages = () =>  Message.findAll();

module.exports = {
    createMessage, 
    getAllMessages,
}