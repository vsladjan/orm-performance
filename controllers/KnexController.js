var knex = require("../knexdb.js").getConnection();


var getSelect = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;

    /* Club basic select */
    start = process.hrtime();
    data = await knex("club");
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec + "s";

    /* Player basic select */
    start = process.hrtime();
    data = await knex("player");
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec + "s";


    /* Equipment basic select */
    start = process.hrtime();
    data = await knex("equipment");
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec + "s";

    /* Response */
    console.log("Sequelize Club select time: " + jsonObj.ClubTime);
    console.log("Sequelize Player select time: " + jsonObj.PlayerTime);
    console.log("Sequelize Equipment select time: " + jsonObj.EquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWithJoin = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;

    // Select player with club
    start = process.hrtime();
    data = await knex("player").join("club", "player.clubId", "club.id");
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec + "s";

    // Select player with equipment
    start = process.hrtime();
    data = await knex("player").join('playerequipment', 'player.id', 'playerequipment.playerId')
                                .join('equipment', 'playerequipment.equipmentId', 'equipment.id');
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTime = sec + "s";

    // Response
    console.log("Knex Player and Club select time: " + jsonObj.PlayerClubTime);
    console.log("Knex Player and Equipment select time: " + jsonObj.PlayerEquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectColumn = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
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
    jsonObj.PlayerEquipmentColumnTime = sec + "s";

    // Response
    console.log("Knex Player and Equipment select specific column time: " + jsonObj.PlayerEquipmentColumnTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWhere = async function(req, res){
    let paramId = req.params.id;
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;


    // Player select join with equipment
    start = process.hrtime();
    data = await knex("player").join('playerequipment', 'player.id', 'playerequipment.playerId')
                                .join('equipment', 'playerequipment.equipmentId', 'equipment.id')
                                .where('player.id', paramId);
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec + "s";

    // Response
    console.log("Knex Player and Equipment select where time: " + jsonObj.PlayerEquipmentWhereTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getProcedure = async function(req, res){
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;

    // Player select join with equipment
    start = process.hrtime();
    let data = await knex.raw("call proc(1);");
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.ProcedureTime = sec + "s";


    console.log("Knex procedure" + jsonObj.ProcedureTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}


module.exports.getSelect = getSelect;
module.exports.getSelectWithJoin = getSelectWithJoin;
module.exports.getSelectColumn = getSelectColumn;
module.exports.getSelectWhere = getSelectWhere;
module.exports.getProcedure = getProcedure;