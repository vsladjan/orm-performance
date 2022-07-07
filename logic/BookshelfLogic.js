const dbBookshelf = require("../models/bookshelf/model.js");
var Player = dbBookshelf.Player;
var Club = dbBookshelf.Club;
var Equipment = dbBookshelf.Equipment;


var select = async function(){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;

    /* Club basic select */
    start = process.hrtime();
    data = await Club.fetchAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec;

    /* Player basic select */
    start = process.hrtime();
    data = await Player.fetchAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec;


    /* Equipment basic select */
    start = process.hrtime();
    data = await Equipment.fetchAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec;

    return jsonObj;
}

var selectWithJoin = async function(){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;

    start = process.hrtime();
    await Player.fetchAll({withRelated:['club']});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec;

    start = process.hrtime();
    data = await Player.fetchAll({withRelated:['equipments']});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTime = sec;


    return jsonObj;
}

var selectColumn = async function(){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;


    start = process.hrtime();
    data = await Player.fetchAll({columns: ['id', 'name'],
        withRelated: [{
            'equipments': function(qb) {
                qb.select('name'); //Table1Id is omitted!
            }
        }]
    });
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentColumnTime = sec;

    return jsonObj;
}

var selectWhere = async function(paramId){
    let jsonObj = {};
    let data;
    let start, elapsed, sec;


    start = process.hrtime();
    data = await Player.where('player.id', paramId).fetchAll({withRelated:['equipments']});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec;

    return jsonObj;
}

var procedure = async function(paramValue){
    let jsonObj = {};
    let  data;
    let start, elapsed, sec;


    start = process.hrtime();
    let knex = dbBookshelf.db.knex;
    data = await knex.raw("call procedure_orm(?);",
                            [paramValue]);
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec;

    return jsonObj;
}


module.exports.select = select;
module.exports.selectWithJoin = selectWithJoin;
module.exports.selectColumn = selectColumn;
module.exports.selectWhere = selectWhere;
module.exports.procedure = procedure;