module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('City', {
        cityId: {
            field: 'cityId',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        city_name: {
            field: 'city_name',
            type: DataTypes.STRING(45),
            validate: {
                allowNull: true,
            },
        },
        countryId: {
            field: 'countryId',
            type: DataTypes.INTEGER,
            foreignKey: {
                name: 'countryId',
                allowNull: false
              },
        },
    },         
    );
    return City;
};