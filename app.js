if (process.argv.length != 3){
    console.log("Wrong number of arguments");
}else {
    let command = process.argv[2];
    let logic, fullLogFile, logFile;
    switch (command) {
        case 'sequelize':
            logic = require("./logic/SequelizeLogic.js");
            fullLogFile = "./output/sequelize-log-ALL.txt";
            logFile = "./output/sequelize-log.txt";
            break;
        case 'bookshelf':
            logic = require("./logic/BookshelfLogic.js");
            fullLogFile = "./output/bookshelf-log-ALL.txt";
            logFile = "./output/bookshelf-log.txt";
            break;
        case 'knex':
            logic = require("./logic/KnexLogic.js");
            fullLogFile = "./output/knex-log-ALL.txt";
            logFile = "./output/knex-log.txt";
            break;
        case 'objection':
            logic = require("./logic/ObjectionLogic.js");
            fullLogFile = "./output/objection-log-ALL.txt";
            logFile = "./output/objection-log.txt";
            break;
        case 'typeorm':
            logic = require("./logic/TypeormLogic.js");
            fullLogFile = "./output/typeorm-log-ALL.txt";
            logFile = "./output/typeorm-log.txt";
            break;
        case 'mikroorm':
            logic = require("./logic/MikroormLogic.js");
            fullLogFile = "./output/mikroorm-log-ALL.txt";
            logFile = "./output/mikroorm-log.txt";
            break;
        default:
            break;
    }

    (async function(){
        if (logic){
            const { sequelize, Club, Player, Equipment, PlayerEquipment } = require("./sequelize.js");
            let knexDb = require("./knexdb.js").createConnection();
            let bookshelfDb = require("./bookshelf.js").createConnection();
            let objectionDb = require("./objection.js").createConnection();
            require ("reflect-metadata");
            let helper = require("./logic/helper.js");
            let typeorm = await require("./typeormdb.js").createConnection();
            let mikroorm = await require("./mikroormdb.js").createConnection();


            let times = [];
            let selectTime = await logic.select();
            let selectWithJoinTime = await logic.selectWithJoin();
            let selectColumnTime = await logic.selectColumn();
            let selectWhereTime = await logic.selectWhere(2);
            //await logic.destroy();
            times.push(selectTime);
            times.push(selectWithJoinTime);
            times.push(selectColumnTime);
            times.push(selectWhereTime);
        
            helper.writeFile(times, logFile, fullLogFile);
        }
    })();

}