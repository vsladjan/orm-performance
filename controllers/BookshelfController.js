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
    console.log("Sequelize Club select time: " + jsonObj.ClubTime);
    console.log("Sequelize Player select time: " + jsonObj.PlayerTime);
    console.log("Sequelize Equipment select time: " + jsonObj.EquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWithJoin = async function(req, res){

}

var getSelectColumn = async function(req, res){
  
}


module.exports.getSelect = getSelect;
module.exports.getSelectWithJoin = getSelectWithJoin;
module.exports.getSelectColumn = getSelectColumn;