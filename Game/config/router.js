const express = require("express");
const mainController = require("../app/controllers/main");
const router = express.Router();

router.get("/about", mainController.about);
router.get("/ui", mainController.ui);
router.get("/game", mainController.game);

module.exports = router;