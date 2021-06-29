module.exports = (sequelize, DataTypes) => {
    const Region = sequelize.define('Region', {
        regionId: {
            field: 'regionId',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        reg_name: {
            field: 'reg_name',
            type: DataTypes.STRING(45),
            validate: {
                notNull: true,
            },
        },
    },         
    );
    return Region;
};