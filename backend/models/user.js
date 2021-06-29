const { _sequelize } = require('../config/database.js');
const { DataTypes } = require('sequelize');
const Auth = require('./auth');

const User = _sequelize.define('User', {
    userId: {
        field: 'userId',
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    u_name: {
        field: 'u_name',
        type: DataTypes.STRING(45),
        validate: {
            notEmpty: true,
        }
    },         
    lastname: {
        field:'lastname',
        type: DataTypes.STRING(60),
        validate: {
            notEmpty: true,
        }
    },
    email: {
        field: 'email',
        type: DataTypes.STRING(60),
        validate: {
            isEmail: true,
            allowNull: false,
        },
        unique: {
            args: true,
            msg: 'This email already exists',
        }
    },
    phone: {
        field: 'phone',
        type: DataTypes.STRING(15),
    },
    adress: {
        field: 'adress',
        type: DataTypes.STRING(60),
        validate: {
            notEmpty: true,
            },
    },
    isAdmin: {
        field: 'isAdmin',
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    }
});

User.associate = function(models) {
    User.hasOne(Auth, { 
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        foreignKey: 'userId' 
      });
      Auth.belongsTo(User);
}


module.exports = { User }