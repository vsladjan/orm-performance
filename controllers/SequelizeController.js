
var express = require("express");
const { sequelize, Club, Player, Equipment, PlayerEquipment } = require("../sequelize.js");


var getSelect = async function(req, res){
    await sequelize.sync();
    let jsonObj = {};
    let jsonStr;
    let start, elapsed, msec, sec;

    start = process.hrtime();
    await Club.findAll();
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.ClubTime = sec + "s";

    start = process.hrtime();
    await Player.findAll({
        include: [{
            model: Club,
            required: true
        }]
    });
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.PlayerTime = sec + "s";

    start = process.hrtime();
    await Equipment.findAll();
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.EquipmentTime = sec + "s";
    
    console.log("Sequelize Club select time: " + jsonObj.ClubTime);
    console.log("Sequelize Player select time: " + jsonObj.ClubTime);
    console.log("Sequelize Equipment select time: " + jsonObj.EquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getInsert = async function(req, res){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    await sequelize.sync();
    await sequelize.sync({ force: true});
    for(i=1; i<64; i++){
        await Club.create({
            name: 'name' + i,
            location: 'location' + i,
            created: 1900 + i
        });
        await Player.create({
            name: 'name' + i,
            lastname: 'lastname' + i,
            age: 20,
            clubId: 1
        });
        await Equipment.create({
            name: 'name' + i,
            description: 'description' + i,
            color: 'color' + i,
        });
        await PlayerEquipment.create({
            playerId: i,
            equipmentId: i
        });
    }
}


module.exports.getSelect = getSelect;
module.exports.getInsert = getInsert;