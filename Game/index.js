const express = require('express');
const router = require("./config/router");
const logger = require("morgan");
const handlebars = require("express-handlebars");

const app = express();

app.engine("handlebars", handlebars());

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/app/views`);

app.use("/img", express.static(`${__dirname}/public/img`));

app.use(logger("combined"));
app.use(router);

app.listen(3000, function () {
    console.log("Ouvindo a porta 3000");
});