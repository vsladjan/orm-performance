const { Model } = require('objection');
var path = require('path');
   
// Defining models
class Club extends Model{
    static get tableName(){
        return 'club';
    }

    static relationMappings = {
        players: {
            relation: Model.HasManyRelation,
            modelClass: path.join(__dirname, 'player'),
            join: {
                from: 'club.id',
                to: 'player.clubId'
            }
        }
    }
    
}


module.exports.Club = Club;