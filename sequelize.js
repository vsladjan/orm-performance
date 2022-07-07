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


db.Club = require('./models/sequelize/club.js')(sequelize, Sequelize);
db.Player = require('./models/sequelize/player.js')(sequelize, Sequelize);
db.Equipment = require('./models/sequelize/equipment.js')(sequelize, Sequelize);
db.Playerequipment = require('./models/sequelize/playerequipment.js')(sequelize, Sequelize);


db.Club.hasMany(db.Player);
db.Player.belongsTo(db.Club);
db.Player.belongsToMany(db.Equipment, {through: db.Playerequipment});
db.Equipment.belongsToMany(db.Player, {through: db.Playerequipment});

module.exports = db;
