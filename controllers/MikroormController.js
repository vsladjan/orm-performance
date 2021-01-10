var mikroDI = require("../mikroormdb.js").DI;
var Player = require('../models/mikroorm/entities/Player.js').Player;
var Club = require('../models/mikroorm/entities/Club.js').Club;
var Equipment = require('../models/mikroorm/entities/Equipment.js').Equipment;
var PlayerEquipment = require('../models/mikroorm/entities/PlayerEquipment').Playerequipment;


var getSelect = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;
    let rep;

    /* Club basic select */
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Club);
    data = await rep.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec + "s";
    console.log(data);

    /* Player basic select */
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Player);
    data = await rep.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec + "s";
    console.log(data);


    /* Equipment basic select */
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Equipment);
    data = await rep.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec + "s";
    console.log(data);

    /* Response */
    console.log("MikroORM Club select time: " + jsonObj.ClubTime);
    console.log("MikroORM Player select time: " + jsonObj.PlayerTime);
    console.log("MikroORM Equipment select time: " + jsonObj.EquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWithJoin = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;
    let rep;

    // Player with club select
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Player);
    data = await rep.findAll(['clubId']);
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec + "s";

    // Player with equipment select
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Player);
    data = await rep.findAll(['equipments']);
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTime = sec + "s";

    console.log(data[0].equipments);
    // Response
    console.log("MikroORM Player Equipment select time: " + jsonObj.PlayerEquipmentTime);
    console.log("MikroORM Player Club select time: " + jsonObj.PlayerClubTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectColumn = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;

    // Player with equipment select
    start = process.hrtime();
    data = await mikroDI.em.createQueryBuilder(Player, 'p')
                                .select(['p.id as playerId', 'p.name as playerName', 'e.name as equipmentName'])
                                .leftJoin('equipments', 'e').execute();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec + "s";

    // Response
    console.log("MikroORM Player Equipment select specific column time: " + jsonObj.PlayerEquipmentColumnTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWhere = async function(req, res){
    let paramId = req.params.id;
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;
    let rep;

    // Player with equipment select
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Player);
    data = await rep.findAll(paramId, ['equipments']);
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec + "s";

    // Response
    console.log("MikroORM Player Equipment select where time: " + jsonObj.PlayerEquipmentWhereTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getProcedure = async function(req, res){
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;

    // Procedure
    start = process.hrtime();
    let knex = mikroDI.em.getConnection().getKnex();
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