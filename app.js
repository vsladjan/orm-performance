const { sequelize, Club, Player, Equipment, PlayerEquipment } = require("./sequelize.js");
var knexDb = require("./knexdb.js").createConnection();
var knexDb = require("./bookshelf.js").createConnection();
var objectionDb = require("./objection.js").createConnection();
var express = require('express');
var router = require("./router/router.js");
var app = express();
var port = 3000;
  
app.listen(port, function(){
    console.log("Server started on port " + port + "...");
});

app.use("/orm", router);

