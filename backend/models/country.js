module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('Country', {
        countryId: {
            field: 'countryId',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        count_name: {
            field: 'count_name',
            type: DataTypes.STRING(45),
            validate: {
                notNull: true,
            },
        },
        regionId: {
            field: 'regionId',
            type: DataTypes.INTEGER,
            foreignKey: {
                name: 'regionId',
                allowNull: false
            },
        },
    },         
    );
    return Country;
};