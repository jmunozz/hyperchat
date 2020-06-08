const Sequelize = require('sequelize');
const db = require('../db');

/**
 * Create Message Model.
 */
const Message = db.define('Messages', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  message: Sequelize.TEXT,
  username: Sequelize.STRING,
  room: Sequelize.STRING,
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
  timestamps: false,
});

module.exports = Message;
