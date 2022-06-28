var knex = require("../knexdb.js").getConnection();


var select = async function(){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;

    /* Club basic select */
    start = process.hrtime();
    data = await knex("club");
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec;

    /* Player basic select */
    start = process.hrtime();
    data = await knex("player");
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec;


    /* Equipment basic select */
    start = process.hrtime();
    data = await knex("equipment");
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec;

    return jsonObj;
}

var selectWithJoin = async function(){
    let jsonObj = {};
    let  data;
    let start, elapsed, sec;

    // Select player with club
    start = process.hrtime();
    data = await knex("player").join("club", "player.clubId", "club.id");
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec;

    // Select player with equipment
    start = process.hrtime();
    data = await knex("player").join('playerequipment', 'player.id', 'playerequipment.playerId')
                                .join('equipment', 'playerequipment.equipmentId', 'equipment.id');
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTime = sec;

    return jsonObj;
}

var selectColumn = async function(){
    let jsonObj = {};
    let  data;
    let start, elapsed, sec;


    // Player select join with equipment
    start = process.hrtime();
    data = await knex("player").join('playerequipment', 'player.id', 'playerequipment.playerId')
                                .join('equipment', 'playerequipment.equipmentId', 'equipment.id')
                                .select(
                                        knex.ref("player.id").as('playerId'),
                                        knex.ref("player.name").as('playerName'),
                                        knex.ref("equipment.name").as('equipmentName')
                                );
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec;

    return jsonObj;
}

var selectWhere = async function(paramId){
    let jsonObj = {};
    let  data;
    let start, elapsed, sec;


    // Player select join with equipment
    start = process.hrtime();
    data = await knex("player").join('playerequipment', 'player.id', 'playerequipment.playerId')
                                .join('equipment', 'playerequipment.equipmentId', 'equipment.id')
                                .where('player.id', paramId);
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec;

    return jsonObj;
}

var procedure = async function(){
    let  jsonObj = {};
    let start, elapsed, sec;

    // Player select join with equipment
    start = process.hrtime();
    let data = await knex.raw("call proc(1);");
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.ProcedureTime = sec;

    return jsonObj;
}


module.exports.select = select;
module.exports.selectWithJoin = selectWithJoin;
module.exports.selectColumn = selectColumn;
module.exports.selectWhere = selectWhere;
module.exports.procedure = procedure;