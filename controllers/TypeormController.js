const typeorm = require('typeorm');
var Player = require("../models/typeorm/entities/Player.js").Player;
var Club = require("../models/typeorm/entities/Club.js").Club;
var Equipment = require("../models/typeorm/entities/Equipment.js").Equipment;


var getSelect = async function(req, res){
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;
    let rep, data;

    // Get players basic
    start = process.hrtime();
    rep = typeorm.getConnection().getRepository(Club);
    data = await rep.find();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec + "s";

    // Get players basic
    start = process.hrtime();
    rep = typeorm.getConnection().getRepository(Player);
    data = await rep.find();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec + "s";

    // Get players basic
    start = process.hrtime();
    rep = typeorm.getConnection().getRepository(Equipment);
    data = await rep.find();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec + "s";


    
    console.log("Typeorm Club select time: " + jsonObj.ClubTime);
    console.log("Typeorm Player select time: " + jsonObj.PlayerTime);
    console.log("Typeorm Equipment select time: " + jsonObj.EquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWithJoin = async function(req, res){
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;
    let rep, data;

    // Player select with club
    start = process.hrtime();
    rep = typeorm.getConnection().getRepository(Player);
    data = await rep.find({relations: ["club"]});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec + "s";

    // Plater select with equipment
    start = process.hrtime();
    rep = typeorm.getConnection().getRepository(Player);
    data = await rep.find({relations: ["equipment"]});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTime = sec + "s";
    
    console.log("Typeorm Player and Club select time: " + jsonObj.PlayerClubTime);
    console.log("Typeorm Player and Equipment select time: " + jsonObj.PlayerEquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectColumn = async function(req, res){
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;
    let rep, data;

    // Player select with club
    start = process.hrtime();
    rep = typeorm.getConnection().getRepository(Player);
    const query = await  typeorm.getConnection().getRepository(Player)
    .createQueryBuilder('p')
    .innerJoinAndSelect('p.equipment', 'e')
    .select(['p.name', 'e.name', 'e.color']).execute();
            
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec + "s";

    console.log(data);

    console.log("Typeorm Player and Equipment select specific columns time: " + jsonObj.PlayerEquipmentColumnTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWhere = async function(req, res){
    let paramId = req.params.id;
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;
    let rep, data;

    // Player select with club
    start = process.hrtime();
    rep = typeorm.getConnection().getRepository(Player);
    const query = await  typeorm.getConnection().getRepository(Player)
                                .createQueryBuilder('p')
                                .innerJoinAndSelect('p.equipment', 'e')
                                .select(['p.id', 'p.name', 'e.name']).where('p.id', paramId).execute();          
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec + "s";


    console.log("Typeorm Player and Equipment select specific columns time: " + jsonObj.PlayerEquipmentColumnTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getProcedure = async function(req, res){
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;
    let rep, data;

    // Player select with club
    start = process.hrtime();
    let result = await typeorm.getConnection().manager.query("call proc(1);")
            
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ProcedureTime = sec + "s";


    console.log("Typeorm Procedure: " + jsonObj.ProcedureTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}


module.exports.getSelect = getSelect;
module.exports.getSelectWithJoin = getSelectWithJoin;
module.exports.getSelectColumn = getSelectColumn;
module.exports.getSelectWhere = getSelectWhere;
module.exports.getProcedure = getProcedure;