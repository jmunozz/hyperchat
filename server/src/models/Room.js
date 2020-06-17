const Sequelize = require('sequelize');
const db = require('../db');
const Message = require('./Message').Message;
// import { Message } from './Message';

/**
 * Create Room Model.
 */
const Room = db.define('Rooms', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.TEXT,
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
  timestamps: false,
});

Room.hasMany(Message, { as: 'messages', foreignKey: 'roomId' });
Message.belongsTo(Room, { as: 'room' });

module.exports = {Room};
