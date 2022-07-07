module.exports = function(sequelize, DataTypes) {
    return sequelize.define('club', {
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
        location: {
            type: DataTypes.STRING
        },
        created: {
            type: DataTypes.INTEGER
        }
    });
};