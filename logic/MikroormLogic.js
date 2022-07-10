var mikroDI = require("../mikroormdb.js").getConnection();
var Player = require('../models/mikroorm/entities/Player.js').Player;
var Club = require('../models/mikroorm/entities/Club.js').Club;
var Equipment = require('../models/mikroorm/entities/Equipment.js').Equipment;
var PlayerEquipment = require('../models/mikroorm/entities/PlayerEquipment').Playerequipment;


var select = async function(){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;
    let rep;

    /* Club basic select */
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Club);
    data = await rep.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec;

    /* Player basic select */
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Player);
    data = await rep.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec;


    /* Equipment basic select */
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Equipment);
    data = await rep.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec;

    return jsonObj;
}

var selectWithJoin = async function(){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;
    let rep;

    // Player with club select
    start = process.hrtime();
    await mikroDI.em.fork().createQueryBuilder(Player, 'p')
                                .select('*')
                                .leftJoin('clubId', 'c').execute();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec;

    // Player with equipment select
    start = process.hrtime();
    await mikroDI.em.fork().createQueryBuilder(Player, 'p')
                                .select('*')
                                .leftJoin('equipments', 'e').execute();
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
    data = await mikroDI.em.fork().createQueryBuilder(Player, 'p')
                                .select(['p.id as playerId', 'p.name as playerName', 'e.name as equipmentName'])
                                .leftJoin('equipments', 'e').execute();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec;


    return jsonObj;
}

var selectWhere = async function(paramId){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;
    let rep;

    // Player with equipment select
    start = process.hrtime();
    rep = mikroDI.em.fork().getRepository(Player);
    data = await rep.find({ id: paramId }, { populate: ['equipments'] });
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec;

    return jsonObj;
}

var procedure = async function(paramValue){
    let jsonObj = {};
    let start, elapsed, sec;

    // Procedure
    start = process.hrtime();
    let knex = mikroDI.em.getConnection().getKnex();
    let data = await knex.raw("call procedure_orm(?);",
                            [paramValue]);
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