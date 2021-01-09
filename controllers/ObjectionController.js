var Club = require("../models/objection/club.js").Club;
var Player = require("../models/objection/player.js").Player;
var Equipment = require("../models/objection/equipment.js").Equipment;


var getSelect = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;

    // Club basic select
    start = process.hrtime();
    data = await Club.query();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec + "s";

    // Player basic select
    start = process.hrtime();
    data = await Player.query();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec + "s";


    // Equipment basic select
    start = process.hrtime();
    data = await Equipment.query();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec + "s";

    // Response
    console.log("Objection Club select time: " + jsonObj.ClubTime);
    console.log("Objection Player select time: " + jsonObj.PlayerTime);
    console.log("Objection Equipment select time: " + jsonObj.EquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWithJoin = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;

    // Player with equipment select
    start = process.hrtime();
    data = await Player.query().withGraphJoined('equipments');
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTime = sec + "s";

    // Player with club select
    start = process.hrtime();
    data = await Player.query().withGraphJoined('club');
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec + "s";

    // Response
    console.log("Objection Player Equipment select time: " + jsonObj.PlayerEquipmentTime);
    console.log("Objection Player Club select time: " + jsonObj.PlayerClubTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectColumn = async function(req, res){
    let paramId = req.params.id;
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;

    // Player with equipment select
    start = process.hrtime();
    data = await Player.query().innerJoin('equipment', 'player.id', 'equipment.id').select(
                                                                    'player.id as playerId', 
                                                                    'player.name as playerName', 
                                                                    'equipment.name as equipmentName'
                                                            );
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec + "s";

    // Response
    console.log("Objection Player Equipment select specific column time: " + jsonObj.PlayerEquipmentColumnTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWhere = async function(req, res){
    let paramId = req.params.id;
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;

    // Player with equipment select
    start = process.hrtime();
    data = await Player.query().withGraphJoined('equipments').where('player.id', paramId);
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec + "s";

    // Response
    console.log("Objection Player Equipment select where time: " + jsonObj.PlayerEquipmentWhereTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getProcedure = async function(req, res){
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;

    // Player select join with equipment
    start = process.hrtime();
    const knex = Player.knex();
    let data = await knex.raw("call proc(1);");
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.ProcedureTime = sec + "s";

    console.log("Objection procedure" + jsonObj.ProcedureTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}


module.exports.getSelect = getSelect;
module.exports.getSelectWithJoin = getSelectWithJoin;
module.exports.getSelectColumn = getSelectColumn;
module.exports.getSelectWhere = getSelectWhere;
module.exports.getProcedure = getProcedure;