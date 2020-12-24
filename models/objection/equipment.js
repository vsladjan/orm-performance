const Player = require('./player.js').Player;

const { Model } = require('objection');

class Equipment extends Model{
    static get tableName(){
        return 'equipment';
    }

    static relationMappings = {
        players: {
            relation: Model.ManyToManyRelation,
            modelClass: Player,
            join:{
                from: 'equipment.id',
                through: {
                    from: 'PlayerEquipment.equipmentId',
                    to: 'PlayerEquipment.playerId'
                },
                to: 'player.id'
            }
        }
    }
}

module.exports.Equipment = Equipment;