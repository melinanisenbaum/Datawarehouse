const { Sequelize } = require('sequelize');
const config = require('./config.js');

const _sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    dialect: config.DB_DIALECT,
    host: config.HOST,
    port: config.DB_PORT,
    logging: false,   
    dialectOptions: {
      charset: 'utf8'
    },
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
    }
  }
);

module.exports = { _sequelize };

