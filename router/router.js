var express = require("express");
var router = express.Router();
var SequelizeController = require("../controllers/sequelizeController.js");

router.get("/sequelize/select", function(req, res){
    SequelizeController.getSelect(req, res);
});

router.get("/sequelize/insert", function(req, res){
    SequelizeController.getInsert(req, res);
});

module.exports = router;