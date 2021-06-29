const { _sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');

const Auth = _sequelize.define('Auth', {
    authId: {
        field: `authId`,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    auth_pass: {
        field: `auth_pass`,
        type: DataTypes.TEXT,
        validate: {
            notEmpty: {
                msg: "Password is required",
            },
        },
    },
    userId: {
        field: `userId`,
        type: DataTypes.INTEGER,
        foreignKey: {
            name: 'userId',
            allowNull: false
        },
    },
    createAt: {
        field: 'auth_date',
        type: DataTypes.DATE,
    }},
);

module.exports = { Auth }