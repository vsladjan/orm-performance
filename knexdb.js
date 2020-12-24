const config = require('./config.json');

const dbConfig = {
	client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : config.db_username,
    password : config.db_password,
    database : 'orm',
    charset  : 'utf8'
  }
};

var knex;

var createConnection = function(){
    knex = require('knex')(dbConfig);
}


var getConnection = function(){
   return knex;
}


module.exports.createConnection = createConnection;
module.exports.getConnection = getConnection;