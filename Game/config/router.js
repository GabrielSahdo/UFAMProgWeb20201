const express = require("express");
const mainController = require("../app/controllers/main");
const router = express.Router();

router.get("/about", mainController.about);

module.exports = router;