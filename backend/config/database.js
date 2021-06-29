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
//_sequelize.sync();

////sequelize.Channel.belongsToMany(sequelize.Contact);
//sequelize.Contact.hasMany(sequelize.Channel, {as: 'preferred_channel', constraints: false});

//sequelize.City.belongsToMany(sequelize.Contact);
//sequelize.Contact.hasOne(sequelize.City, { foreignKey: 'cityId' });

//sequelize.City.belongsToMany(sequelize.Company);
//sequelize.Company.hasOne(sequelize.City, { foreignKey: 'cityId' });

//sequelize.City.belongsTo(sequelize.Country, { foreignKey: 'cityId' });
//sequelize.Country.hasMany(sequelize.City);

//sequelize.Country.belongsTo(sequelize.Region, { foreignKey: 'countryId' });
//sequelize.Region.hasMany(sequelize.Country);

//sequelize.contact.belongsTo(sequelize.company, { foreignKey: 'contactId' });
//sequelize.company.hasMany(sequelize.contact);

module.exports = { _sequelize };

