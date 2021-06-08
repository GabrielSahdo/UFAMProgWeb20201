const express = require('express');
const router = require("./config/router");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const sass = require("node-sass-middleware");

const app = express();

app.engine("handlebars", handlebars());

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/app/views`);

app.use(sass({
    src: `${__dirname}/public/scss`,
    dest: `${__dirname}/public/css`,
    outputStyle: 'compressed',
    prefix: '/css',
}))

app.use("/webfonts", express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`))
app.use("/img", express.static(`${__dirname}/public/img`));
app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/js", [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/popper.js/dist/umd'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js'),
]);


app.use(logger("combined"));
app.use(router);

app.listen(3000, function () {
    console.log("Ouvindo a porta 3000");
});