module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        contactId: {
            field: 'contactId',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        cont_name: {
            field: 'cont_name',
            type: DataTypes.STRING(45),
            validate: {
                notEmpty: true,
            },
        },         
        cont_lastname: {
            field:'cont_lastname',
            type: DataTypes.STRING(60),
            validate: {
                notEmpty: true,
            },
        },
        email: {
            field: 'email',
            type: DataTypes.STRING(60),
            validate: {
                isEmail: true,
                allowNull: true,
            },
            unique: {
                args: true,
                msg: 'This email already exists',
            },
        },
        phone: {
            field: 'phone',
            type: DataTypes.STRING(15),
        },
        adress: {
            field: 'adress',
            type: DataTypes.STRING(60),
            validate: {
                allowNull: true,
                },
        },
        interest: {
            field: 'interest',
            type: DataTypes.INTEGER,
        },
        preferred_channel: {
            field: 'preferred_channel',
            type: DataTypes.INTEGER,
            foreignKey: {
                name: 'channelId',
                allowNull: false
            },
        },
        
    },
    );
    return Contact;
};