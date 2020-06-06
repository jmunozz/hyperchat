const Sequelize = require('sequelize');
const Message = require('../../models/Message');
const db = require('../../db');

const getAllMessages = () => Message.findAll();

const getAllRooms = () => db.query('SELECT room as name, COUNT(*) as messages FROM Messages GROUP BY name', {
  type: Sequelize.QueryTypes.SELECT,
});

module.exports = {
  getAllMessages,
  getAllRooms,
};
