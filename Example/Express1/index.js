const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("combined"));

app.get("/", (req, res) =>
    res.send("Página principal"));

app.get("/about", (req, res) =>
    res.send("Página about"))

app.listen(3000, () =>
    console.log("Escutando porta 3000"));