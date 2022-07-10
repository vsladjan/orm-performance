var Club = require("../models/objection/club.js").Club;
var Player = require("../models/objection/player.js").Player;
var Equipment = require("../models/objection/equipment.js").Equipment;


var select = async function(){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;

    // Club basic select
    start = process.hrtime();
    data = await Club.query();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec;

    // Player basic select
    start = process.hrtime();
    data = await Player.query();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec;


    // Equipment basic select
    start = process.hrtime();
    data = await Equipment.query();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec;

    return jsonObj;
}

var selectWithJoin = async function(){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;

    // Player with club select
    start = process.hrtime();
    data = await Player.query().withGraphJoined('club');
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec;

    // Player with equipment select
    start = process.hrtime();
    data = await Player.query().withGraphJoined('equipments');
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTime = sec;


    return jsonObj;
}

var selectColumn = async function(){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;

    // Player with equipment select
    start = process.hrtime();
    data = await Player.query().innerJoin('playerequipment', 'player.id', 'playerequipment.playerId')
                                .innerJoin('equipment', 'playerequipment.equipmentId', 'equipment.id').select('player.id as playerId', 
                                                    'player.name as playerName', 
                                                    'equipment.name as equipmentName'
                                                    );
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec;

    return jsonObj;
}

var selectWhere = async function(paramId){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;

    // Player with equipment select
    start = process.hrtime();
    data = await Player.query().withGraphJoined('equipments').where('player.id', paramId);
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec;

    return jsonObj;
}

var procedure = async function(pararmValue){
    let jsonObj = {};
    let start, elapsed, sec;

    // Procedure
    start = process.hrtime();
    const knex = Player.knex();
    let data = await knex.raw("call procedure_orm(?);",
                            [pararmValue]);
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