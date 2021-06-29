const { _sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function findRegion(regionId) {
    const getRegion = await _sequelize.query(
        `SELECT * FROM regions WHERE regionId = :regionId`, 
        {
            replacements: { regionId },
            type: QueryTypes.SELECT
        }
    );
    const region = {
        regionId: getRegion[0].regionId,
        reg_name: getRegion[0].reg_name,
    };
    return region;
}


module.exports = { findRegion }