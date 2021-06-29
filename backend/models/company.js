module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        companyId: {
            field: 'companyId',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        c_name: {
            field: 'c_name',
            type: DataTypes.STRING(45),
            validate: {
                notEmpty: true,
            },
        },         
        email: {
            field: 'email',
            type: DataTypes.STRING(60),
            validate: {
                isEmail: true,
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
                notEmpty: true,
                },
        },
        cityId: {
            field: 'cityId',
            type: DataTypes.INTEGER,
            foreignKey: {
                name: 'cityId',
                allowNull: false
            },
        },
    },
    );
    return Company;
};