const bshelf = require('../../bookshelf.js');

var bookshelfDb = bshelf.getConnection();

// Models
const Club = bookshelfDb.Model.extend({
    tableName: 'club',
    players: function(){
        return this.hasMany(Player, 'playerId', 'id');
    }
});


const Player = bookshelfDb.Model.extend({
    tableName: 'player',
    club: function(){
        return this.belongsTo(Club, 'clubId', 'id');
    },
    equipments: function(){
        return this.belongsToMany(Equipment, 'PlayerEquipment', 'playerId', 'equipmentId');
    }
});

const Equipment = bookshelfDb.Model.extend({
    tableName: 'equipment',
    players: function(){
        return this.belongsToMany(Player, 'PlayerEquipment', 'equipmentId', 'playerId');
    }
});

module.exports.Club = Club;
module.exports.Player = Player;
module.exports.Equipment = Equipment;