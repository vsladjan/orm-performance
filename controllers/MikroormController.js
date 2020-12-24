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