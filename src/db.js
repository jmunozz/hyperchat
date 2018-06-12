const Sequelize = require('sequelize');
const Config = require('../config.json');

/**
 * Create database instance.
 */
const db = new Sequelize(Config.database, Config.user, Config.password, {
  host: Config.host,
  dialect: 'mysql',
});

module.exports = db;
