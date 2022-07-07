module.exports = function(sequelize, DataTypes) {
    return sequelize.define('player', {
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
        lastname: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        clubId: {
            type: DataTypes.INTEGER,
            references:{
                model: 'club',
                key: 'id'
            }
        }
    });
};