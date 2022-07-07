module.exports = function(sequelize, DataTypes) {
    return sequelize.define('equipment', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING
        }
    });
};