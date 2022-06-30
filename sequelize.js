const {Sequelize, DataTypes} = require("sequelize");
const config = require("./config.json");

const sequelize = new Sequelize('orm', config.db_username, config.db_password, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    operatorsAliases: 0,
    define:{
        freezeTableName: true,
        timestamps: false
    }
});

var db = {};

db.sequelize = sequelize;

const Club = sequelize.define('club', {
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

const Player = sequelize.define('player', {
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

const Equipment = sequelize.define('equipment', {
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

const PlayerEquipment = sequelize.define('PlayerEquipment', {});

Club.hasMany(Player);
Player.belongsTo(Club);
Player.belongsToMany(Equipment, {through: PlayerEquipment});
Equipment.belongsToMany(Player, {through: PlayerEquipment});

db.Club = Club;
db.Player = Player;
db.Equipment = Equipment;
db.PlayerEquipment = PlayerEquipment;

module.exports = db;
