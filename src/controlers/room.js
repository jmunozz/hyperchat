const Sequelize = require('sequelize');
const db = require('../db');

const getAllRooms = () => db.query('SELECT room as name, COUNT(*) as messages FROM Messages GROUP BY name', {
        type: Sequelize.QueryTypes.SELECT,
    });

module.exports = {
    getAllRooms, 
}