const express = require('express');
const router = require("./config/router");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const sass = require("node-sass-middleware");
const cookieParser = require("cookie-parser");
const csurf = require('csurf');
const uuid = require('uuid');
const session = require("express-session");

const app = express();


app.engine('handlebars', handlebars({
    helpers: require(__dirname + '/app/views/helpers/helpers.js')
}));

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
    express.static(__dirname + '/public/js'),
]);


app.use(logger("combined"));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(csurf({ cookie: true }));

app.use(session({
    genid: req => {
        return uuid.v4();
    },
    secret: "Hi9Cf#mK98",
    resave: false,
    saveUninitialized: true
}))

app.get("/cookie", function (req, res) {
    if (!("nome" in req.cookies)) {
        res.cookie("nome", "valor");
        res.send("Você nunca passou por aqui!");
    } else {
        res.send("Você já passou por aqui!");
    }
})

app.get("/uuid", function (req, res) {
    res.send(uuid.v4());
});

app.use(router);

app.listen(3000, function () {
    console.log("Ouvindo a porta 3000");
});