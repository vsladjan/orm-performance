const { sequelize, Club, Player, Equipment, PlayerEquipment } = require("../sequelize.js");

var select = async function(){
    await sequelize.sync();
    let jsonObj = {};
    let start, elapsed, sec;

    // Club basic select 
    start = process.hrtime();
    await Club.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.ClubTime = sec;

    // Player basic select
    start = process.hrtime();
    await Player.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerTime = sec;

    // Equipment basic select
    start = process.hrtime();
    await Equipment.findAll();
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.EquipmentTime = sec;

    return jsonObj;
}

var selectWithJoin = async function(){
    await sequelize.sync();
    let jsonObj = {};
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
    jsonObj.PlayerClubTime = sec;

    // Club basic select 
    start = process.hrtime();
    let data = await sequelize.query("SELECT * FROM player as p INNER JOIN club as c on p.clubId=c.id;", { type: sequelize.QueryTypes.SELECT});
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerClubTimeRaw = sec;


    // Player select join with equipment
    start = process.hrtime();
    await Player.findAll({include: [{ model: Equipment }]});
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.PlayerEquipmentTime = sec;

    /* Club basic select */
    start = process.hrtime();
    data = await sequelize.query("SELECT * FROM player as p INNER JOIN playerequipment as pc on p.id=pc.playerId INNER JOIN equipment e ON pc.equipmentId=e.id;",
                                 { type: sequelize.QueryTypes.SELECT} );
    elapsed = process.hrtime(start);
    sec = elapsed[0] + elapsed[1] / 1000000000;
    jsonObj.PlayerEquipmentTimeRaw = sec;

    return jsonObj;
}

var selectColumn = async function(){
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
    jsonObj.PlayerEquipmentColumnTime = sec;

    return jsonObj;
}

var selectWhere = async function(paramId){
    await sequelize.sync();
    let jsonObj = {};
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
    jsonObj.PlayerEquipmentWhereTime = sec;

    return jsonObj;
}

var procedure = async function(){
    await sequelize.sync();
    let jsonStr, jsonObj = {};
    let start, elapsed, sec;

    // Player select join with equipment
    start = process.hrtime();
    let data = await sequelize.query("call proc(1);");
    elapsed = process.hrtime(start);
    msec = elapsed[1] / 1000000000;
    sec = elapsed[0] + msec;
    jsonObj.ProcedureTime = sec;

    return jsonObj;
}


module.exports.select = select;
module.exports.selectWithJoin = selectWithJoin;
module.exports.selectColumn = selectColumn;
module.exports.selectWhere = selectWhere;
module.exports.procedure = procedure;