module.exports = (sequelize, DataTypes) => {
    const Contact_channel = sequelize.define('Contact_channel', {
        ccId: {
            field: 'ccId',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        channelId: {
            field: 'channelId',
            type: DataTypes.INTEGER,
            validate: {
                notNull: true,
                cityID
            },
            foreignKey: {
                name: 'channelId',
                allowNull: false
            },
        },
        contactId: {
            field: 'contactId',
            type: DataTypes.INTEGER,
            validate: {
                notNull: true,
            },
            foreignKey: {
                name: 'contactId',
                allowNull: false
            },
        },
    },         
    );
    return Contact_channel;
};