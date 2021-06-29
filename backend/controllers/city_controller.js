const { _sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function findCity(cityId) {
    const getCity = await _sequelize.query(
        `SELECT * FROM cities WHERE cityId = :cityId`, 
        {
            replacements: { cityId },
            type: QueryTypes.SELECT
        }
    );
    const city = {
        cityId: getCity[0].cityId,
        city_name: getCity[0].city_name,
        countryId: getCity[0].countryId,
    };
    return city;
}


module.exports = { findCity }