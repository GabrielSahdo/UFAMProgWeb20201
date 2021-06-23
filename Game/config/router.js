const express = require("express");
const mainController = require("../app/controllers/main");
const areaController = require("../app/controllers/area");
const cursoController = require('../app/controllers/curso');
const router = express.Router();

router.get("/about", mainController.about);
router.get("/ui", mainController.ui);
router.get("/game", mainController.game);

router.get("/curso", cursoController.index);
router.get("/curso/create", cursoController.create);

router.get("/area", areaController.index);

module.exports = router;