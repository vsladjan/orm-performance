const { MikroORM, LoadStrategy } = require('@mikro-orm/core');

const DI = {};


module.exports.createConnection = (async function(){
    DI.orm = await MikroORM.init();
    DI.em = DI.orm.em;
});


module.exports.getConnection = function(){
    return DI;
}
