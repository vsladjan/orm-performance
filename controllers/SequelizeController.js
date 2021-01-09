var express = require("express");
const { sequelize, Club, Player, Equipment, PlayerEquipment } = require("../sequelize.js");


var getSelect = async function(req, res){
    await sequelize.sync();
    let jsonObj = {};
    let jsonStr;
    let start, elapsed, sec;

    // Club basic select 
    start = process.hrtime();
    await Club.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec + "s";

    // Player basic select
    start = process.hrtime();
    await Player.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec + "s";

    // Equipment basic select
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

var getSelectWithJoin = async function(req, res){
    await sequelize.sync();
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;

    // Player select join with club
    start = process.hrtime();
    await Player.findAll({
        include: [{
            model: Club,
            required: true
        }]
    });
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTime = sec + "s";

    // Club basic select 
    start = process.hrtime();
    let data = await sequelize.query("SELECT * FROM player as p INNER JOIN club as c on p.clubId=c.id;", { type: sequelize.QueryTypes.SELECT});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTimeRaw = sec + "s";


    // Player select join with equipment
    start = process.hrtime();
    await Player.findAll({include: [{ model: Equipment }]});
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.PlayerEquipmentTime = sec + "s";

    /* Club basic select */
    start = process.hrtime();
    data = await sequelize.query("SELECT * FROM player as p INNER JOIN playerequipment as pc on p.id=pc.playerId INNER JOIN equipment e ON pc.equipmentId=e.id;", { type: sequelize.QueryTypes.SELECT});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTimeRaw = sec + "s";

    console.log("Sequelize Player and Club select time: " + jsonObj.PlayerClubTime);
    console.log("Sequelize Player and Equipment select time: " + jsonObj.PlayerEquipmentTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectColumn = async function(req, res){
    await sequelize.sync();
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;

    // Player select join with equipment
    start = process.hrtime();
    let data = await Player.findAll({
                            include: [{ model: Equipment }], 
                            attributes: [
                                [sequelize.col('player.id'), 'playerId'],
                                [sequelize.col('player.name'), 'playerName'],
                                [sequelize.col('equipment.name'), 'equipmentName']
                            ]
                        });
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.PlayerEquipmentColumnTime = sec + "s";


    console.log("Sequelize Player and Equipment select specific columns time: " + jsonObj.PlayerEquipmentColumnTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getSelectWhere = async function(req, res){
    let paramId = req.params.id;
    await sequelize.sync();
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;

    // Player select join with equipment
    start = process.hrtime();
    let data = await Player.findAll({
                            include: [{ model: Equipment }], 
                            where: {
                                id: paramId
                            }
                        });
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.PlayerEquipmentWhereTime = sec + "s";


    console.log("Sequelize Player and Equipment select where time: " + jsonObj.PlayerEquipmentWhereTime);
    jsonStr = JSON.stringify(jsonObj);
    res.send(jsonStr);
}

var getProcedure = async function(req, res){
    await sequelize.sync();
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;

    // Player select join with equipment
    start = process.hrtime();
    let data = await sequelize.query("call proc(1);");
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.ProcedureTime = sec + "s";

    console.log("Sequelize procedure" + jsonObj.ProcedureTime);
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
module.exports.getSelectColumn = getSelectColumn;
module.exports.getSelectWhere = getSelectWhere;
module.exports.getProcedure = getProcedure;
module.exports.getInsert = getInsert;