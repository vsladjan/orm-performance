const dbBookshelf = require("../models/bookshelf/model.js");
var Player = dbBookshelf.Player;
var Club = dbBookshelf.Club;
var Equipment = dbBookshelf.Equipment;


var getSelect = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;

    /* Club basic select */
    start = process.hrtime();
    data = await Club.fetchAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec + "s";

    /* Player basic select */
    start = process.hrtime();
    data = await Player.fetchAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec + "s";


    /* Equipment basic select */
    start = process.hrtime();
    data = await Equipment.fetchAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec + "s";

    /* Response */
    console.log("Bookshelf Club select time: " + jsonObj.ClubTime);
    console.log("Bookshelf Player select time: " + jsonObj.PlayerTime);
    console.log("Bookshelf Equipment select time: " + jsonObj.EquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWithJoin = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;

    start = process.hrtime();
    await Player.fetchAll({withRelated:['club']});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec + "s";

    start = process.hrtime();
    data = await Player.fetchAll({withRelated:['equipments']});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTime = sec + "s";

     /* Response */
    console.log("Bookshelf Player select time: " + jsonObj.PlayerClubTime);
    console.log("Bookshelf Player and Equipment select time: " + jsonObj.PlayerEquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);

}

var getSelectColumn = async function(req, res){
    let jsonObj = {};
    let jsonStr, data;
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
    jsonObj.PlayerEquipmentColumnTime = sec + "s";


     /* Response */
     console.log("Bookshelf Player and Equipment select specific column time: " + jsonObj.PlayerEquipmentColumnTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWhere = async function(req, res){
    let paramId = req.params.id;
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;


    start = process.hrtime();
    data = await Player.where('player.id', paramId).fetchAll({withRelated:['equipments']});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec + "s";

     /* Response */
    console.log("Bookshelf Player and Equipment where select time: " + jsonObj.PlayerEquipmentWhereTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getProcedure = async function(req, res){
    let paramId = req.params.id;
    let jsonObj = {};
    let jsonStr, data;
    let start, elapsed, sec;


    start = process.hrtime();
    let knex = dbBookshelf.db.knex;
    data = await knex.raw("call proc(1);");
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentWhereTime = sec + "s";


     /* Response */
    console.log("Bookshelf Player and Equipment where select time: " + jsonObj.PlayerEquipmentWhereTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}


module.exports.getSelect = getSelect;
module.exports.getSelectWithJoin = getSelectWithJoin;
module.exports.getSelectColumn = getSelectColumn;
module.exports.getSelectWhere = getSelectWhere;
module.exports.getProcedure = getProcedure;