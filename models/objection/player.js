const Club = require('./club.js').Club;
var path = require('path');

const { Model } = require('objection');

class Player extends Model{
    static get tableName(){
        return 'player';
    }

    static relationMappings = {
        club: {
            relation: Model.BelongsToOneRelation,
            modelClass: Club,
            join:{
                from: 'player.clubId',
                to: 'club.id'
            }
        },
        equipments: {
            relation: Model.ManyToManyRelation,
            modelClass: path.join(__dirname, 'equipment'),
            join:{
                from: 'player.id',
                through: {
                    from: 'PlayerEquipment.playerId',
                    to: 'PlayerEquipment.equipmentId'
                },
                to: 'equipment.id'
            }
        }
    }
}

module.exports.Player = Player;