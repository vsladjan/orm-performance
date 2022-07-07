const typeorm = require('typeorm');
var Player = require("../models/typeorm/entities/Player.js").Player;
var Club = require("../models/typeorm/entities/Club.js").Club;
var Equipment = require("../models/typeorm/entities/Equipment.js").Equipment;


var select = async function(){
    let dataSource = await require("../typeormdb.js").getConnection();
    let jsonObj = {};
    let start, elapsed, sec;
    let rep, data;

    // Get players basic
    start = process.hrtime();
    rep = dataSource.manager.getRepository(Club);
    data = await rep.find();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec;

    // Get club basic
    start = process.hrtime();
    rep = dataSource.manager.getRepository(Player);
    data = await rep.find();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec;

    // Get equipment basic
    start = process.hrtime();
    rep = dataSource.manager.getRepository(Equipment);
    data = await rep.find();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec;

    return jsonObj;
}

var selectWithJoin = async function(){
    let dataSource = await require("../typeormdb.js").getConnection();
    let jsonObj = {};
    let start, elapsed, sec;
    let rep, data;

    // Player select with club
    start = process.hrtime();
    rep = dataSource.manager.getRepository(Player);
    data = await rep.find({relations: ["club"]});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec;

    // Plater select with equipment
    start = process.hrtime();
    rep = dataSource.manager.getRepository(Player);
    data = await rep.find({relations: ["equipment"]});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTime = sec;

    return jsonObj;
}

var selectColumn = async function(){
    let dataSource = await require("../typeormdb.js").getConnection();
    let jsonObj = {};
    let start, elapsed, sec;
    let rep, data;

    // Player select with club
    start = process.hrtime();
    rep = dataSource.manager.getRepository(Player);
    const query = await  dataSource.manager.getRepository(Player)
    .createQueryBuilder('p')
    .innerJoinAndSelect('p.equipment', 'e')
    .select(['p.name', 'e.name', 'e.color']).execute();
            
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec;

    return jsonObj;
}

var selectWhere = async function(paramId){
    let dataSource = await require("../typeormdb.js").getConnection();
    let jsonObj = {};
    let start, elapsed, sec;
    let rep, data;

    // Player select with club
    start = process.hrtime();
    rep = dataSource.manager.getRepository(Player);
    const query = await  dataSource.manager.getRepository(Player)
                                .createQueryBuilder('p')
                                .innerJoinAndSelect('p.equipment', 'e')
                                .select(['p.id', 'p.name', 'e.name']).where('p.id', paramId).execute();          
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec;

    return jsonObj;
}

var procedure = async function(paramValue){
    let dataSource = await require("../typeormdb.js").getConnection();
    let jsonObj = {};
    let start, elapsed, sec;

    // Player select with club
    start = process.hrtime();
    let result = await dataSource.manager.query("call procedure_orm(?);",
                                                [paramValue]);
            
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ProcedureTime = sec;

    return jsonObj;
}


module.exports.select = select;
module.exports.selectWithJoin = selectWithJoin;
module.exports.selectColumn = selectColumn;
module.exports.selectWhere = selectWhere;
module.exports.procedure = procedure;