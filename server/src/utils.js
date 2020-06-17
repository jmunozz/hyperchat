
const getPubSubRoomChannel = (roomId, eventType) => {
    return `${eventType}_ROOM_${roomId}`;
};

const getPubSubRoomChannelMessageCreated = (roomId) => {
    return getPubSubRoomChannel(roomId, 'MESSAGE_CREATED');

}

module.exports  = {
    getPubSubRoomChannel,
    getPubSubRoomChannelMessageCreated,
}