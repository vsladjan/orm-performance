var express = require("express");
const { sequelize, Club, Player, Equipment, PlayerEquipment } = require("../sequelize.js");



var getSelectWithJoin = async function(req, res){
    await sequelize.sync();
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;

    /* Player basic select */
    start = process.hrtime();
    await Player.findAll({
        include: [{
            model: Club,
            required: true
        }]
    });
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec + "s";


    start = process.hrtime();
    let data = await PlayerEquipment.findAll({include: [{ model: Player }, {model: Equipment }]});
    console.log(data);
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.PlayerEquipmentTime = sec + "s";

    console.log("Sequelize Player select time: " + jsonObj.PlayerTime);
    console.log("Sequelize Player and Equipment select time: " + jsonObj.PlayerEquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelect = async function(req, res){
    await sequelize.sync();
    let jsonObj = {};
    let jsonStr;
    let start, elapsed, sec;

    /* Club basic select */
    start = process.hrtime();
    await Club.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec + "s";

    /* Player basic select */
    start = process.hrtime();
    await Player.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec + "s";

    /* Equipment basic select */
    start = process.hrtime();
    await Equipment.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec + "s";

    
    /* Response */
    console.log("Sequelize Club select time: " + jsonObj.ClubTime);
    console.log("Sequelize Player select time: " + jsonObj.PlayerTime);
    console.log("Sequelize Equipment select time: " + jsonObj.EquipmentTime);
    //console.log("Sequelize PlayerEquipment select time: " + jsonObj.PlayerEquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectColumn = function(){

}

var getInsert = async function(req, res){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    let start = process.hrtime();
    await sequelize.sync({ force: true});
    for(i=1; i<=100; i++){
        await Club.create({
            name: 'name' + i,
            location: 'location' + i,
            created: 1900 + i
        });
        for(j=1; j<=10; j++){
            await Player.create({
                name: 'name ' + i + " " + j,
                lastname: 'lastname ' + i + " " + j,
                age: 20,
                clubId: i
            });
            await Equipment.create({
                name: 'name ' + i + " " + j,
                description: 'description ' + i+ " " + j,
                color: 'color ' + i + " " + j,
            });
        }
        for (j=1; j<10; j++){
            await PlayerEquipment.create({
                playerId: (i-1)*10 + j,
                equipmentId: i*10 - j
            });
        }
    }
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    console.log("Data creation completed, time elapsed: " + sec);
    res.send("Data creation completed, time: " + sec);
}


module.exports.getSelect = getSelect;
module.exports.getSelectWithJoin = getSelectWithJoin;
module.exports.getInsert = getInsert;