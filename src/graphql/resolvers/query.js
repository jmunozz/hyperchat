const Sequelize = require('sequelize');
const Message = require('../../models/Message')
const db = require('../../db');

const getAllMessages = () => {
    return  Message.findAll();
}

const getAllRooms = () => {
    return db.query('SELECT room as name, COUNT(*) as messages FROM Messages GROUP BY name', {
        type: Sequelize.QueryTypes.SELECT,
    });
}

module.exports = {
    getAllMessages,
    getAllRooms,
}