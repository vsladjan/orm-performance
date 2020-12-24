var express = require("express");
var router = express.Router();
var SequelizeController = require("../controllers/SequelizeController.js");
var KnexController = require("../controllers/KnexController.js");
var MikroormController = require("../controllers/MikroormController.js");
var BookshelfController = require("../controllers/BookshelfController.js");
var ObjectionController = require("../controllers/ObjectionController.js");

router.get("/sequelize/select", function(req, res){
    SequelizeController.getSelect(req, res);
});

router.get("/sequelize/selectWithJoin", function(req, res){
    SequelizeController.getSelectWithJoin(req, res);
});

router.get("/sequelize/getSelectColumn", function(req, res){
    SequelizeController.getSelectColumn(req, res);
});


router.get("/knex/select", function(req, res){
    KnexController.getSelect(req, res);
});

router.get("/knex/selectWithJoin", function(req, res){
    KnexController.getSelectWithJoin(req, res);
});

router.get("/knex/getSelectColumn", function(req, res){
    KnexController.getSelectColumn(req, res);
});

router.get("/mikroorm/select", function(req, res){
    MikroormController.getSelect(req, res);
});

router.get("/mikroorm/selectWithJoin", function(req, res){
    MikroormController.getSelectWithJoin(req, res);
});

router.get("/mikroorm/getSelectColumn", function(req, res){
    MikroormController.getSelectColumn(req, res);
});

router.get("/bookshelf/select", function(req, res){
    BookshelfController.getSelect(req, res);
});

router.get("/bookshelf/selectWithJoin", function(req, res){
    BookshelfController.getSelectWithJoin(req, res);
});

router.get("/bookshelf/getSelectColumn", function(req, res){
    BookshelfController.getSelectColumn(req, res);
});

router.get("/objection/select", function(req, res){
    ObjectionController.getSelect(req, res);
});

router.get("/objection/selectWithJoin", function(req, res){
    ObjectionController.getSelectWithJoin(req, res);
});

router.get("/objection/getSelectColumn", function(req, res){
    ObjectionController.getSelectColumn(req, res);
});

router.get("/sequelize/insert", function(req, res){
    SequelizeController.getInsert(req, res);
});

module.exports = router;