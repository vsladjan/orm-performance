if (process.argv.length != 3 && process.argv.length != 4 && process.argv.length != 5){
    console.log("\nWrong number of parameters\n");
    console.log("RUN: node app.js command param1 param2 \n");
    console.log(" command: [sequelize, bookshelf, knex, objection, typeorm, mikroorm]");
    console.log(" param1: NUMBER param for where query (if not passed it will be used default hardcoded value)");
    console.log(" param2: STRING param for procedure query (if not passed it will be used default hardcoded value)\n");
}else {
    let param1 = 2;
    let param2 = "player_name_1";
    if (process.argv.length == 4){
        param1 = process.argv[3];
    }
    if (process.argv.length == 5){
        param1 = process.argv[3];
        param2 = process.argv[4];
    }
    let command = process.argv[2];
    console.log("Command: " + command + " param1: " + param1 + " param2: " + param2);

    let helper = require("./logic/helper.js");
    (async function(){
        if (command == 'sequelize' || command == 'bookshelf' || command == 'knex' || 
                command == 'objection' || command == 'typeorm' || command == 'mikroorm'){

            const { sequelize, Club, Player, Equipment, PlayerEquipment } = require("./sequelize.js");
            let knexDb = require("./knexdb.js").createConnection();
            let bookshelfDb = require("./bookshelf.js").createConnection();
            let objectionDb = require("./objection.js").createConnection();
            require ("reflect-metadata");
            let typeorm = await require("./typeormdb.js").createConnection();
            let mikroorm = await require("./mikroormdb.js").createConnection();

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

            console.log("Running queries for " + command);
            let times = [];
            let selectTime = await logic.select();
            let selectWithJoinTime = await logic.selectWithJoin();
            let selectColumnTime = await logic.selectColumn();
            let selectWhereTime = await logic.selectWhere(param1);
            let procTime = await logic.procedure(param2);
            times.push(selectTime);
            times.push(selectWithJoinTime);
            times.push(selectColumnTime);
            times.push(selectWhereTime);
            times.push(procTime);
        
            helper.writeFile(times, logFile, fullLogFile);
            process.exit();
        } else if (command == "results"){
            let orms = ['sequelize', 'bookshelf', 'knex', 'objection', 'typeorm', 'mikroorm'];
            helper.resultFile(orms, "./output/", "-log-ALL.txt");
        } else {
            console.log("Wrong command");
        }
    })();

}