const { _sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function findChannel(channelId) {
    const getChannel = await _sequelize.query(
        `SELECT * FROM channels WHERE channelId = :channelId`, 
        {
            replacements: { channelId },
            type: QueryTypes.SELECT
        }
    );
    const channel = {
        channelId: getChannel[0].channelId,
        chan_name: getChannel[0].chan_name,
    };
    return channel;
}


module.exports = { findChannel }