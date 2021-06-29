const { _sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function findCountry(countryId) {
    const getCountry = await _sequelize.query(
        `SELECT * FROM countries WHERE countryId = :countryId`, 
        {
            replacements: { countryId },
            type: QueryTypes.SELECT
        }
    );
    const country = {
        countryId: getCountry[0].countryId,
        count_name: getCountry[0].reg_name,
        regionId:getCountry[0].regionId,
    };
    return country;
}


module.exports = { findCountry }