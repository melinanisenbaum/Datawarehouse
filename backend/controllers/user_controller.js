const rateLimit = require('express-rate-limit');
const { validationResult } = require('express-validator');
const { _sequelize } = require('../config/database');
const { QueryTypes } = require ('sequelize');

function createAccountLimiter (req, res, next) {
    rateLimit(
        {
            windowMs: 60 * 60 * 1000, // 1 hour window
            max: 5, // start blocking after 5 requests
            message:
                "Too many accounts created from this IP, please try again after an hour"
        }
    );
    next()
}

async function findUser(userId) {
    const getUser = await _sequelize.query(
        `SELECT * FROM users WHERE userId = :userId`, 
        {
            replacements: { userId },
            type: QueryTypes.SELECT
        }
    );
    const user = {
        id: getUser[0].userId,
        name: getUser[0].u_name,
        lastname: getUser[0].lastname,
        email: getUser[0].email,
        address: getUser[0].address,
        isAdmin: getUser[0].isAdmin,
    };
    return user;
}

module.exports = { createAccountLimiter, findUser }