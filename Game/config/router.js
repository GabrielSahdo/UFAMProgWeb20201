const express = require("express");
const mainController = require("../app/controllers/main");
const areaController = require("../app/controllers/area");
const cursoController = require('../app/controllers/curso');
const router = express.Router();

router.get("/", mainController.index)
router.get("/index", mainController.index)
router.get("/about", mainController.about);
router.get("/ui", mainController.ui);
router.get("/game", mainController.game);

router.get("/curso", cursoController.index);
router.get("/curso/create", cursoController.create);
router.post("/curso/create", cursoController.create);
router.get("/curso/update/:id", cursoController.update);
router.post("/curso/update/:id", cursoController.update);
router.get("/curso/remove/:id", cursoController.remove);
router.get("/curso/:id", cursoController.read);

router.get("/area", areaController.index);

module.exports = router;