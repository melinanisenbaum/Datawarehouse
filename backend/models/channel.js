module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define('Channel', {
        channelId: {
            field: 'channelId',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        chan_name: {
            field: 'chan_name',
            type: DataTypes.STRING(45),
            validate: {
                allowNull: true,
            },
        },
    },         
    );
    return Channel;
};