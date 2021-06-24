// Arquivo app/controllers/curso.js
const models = require('../models/index');
const Curso = models.Curso;

async function index(req, res) { };
async function create(req, res) {
  console.log(req.route.methods.get);

  if (req.route.methods.get) { 
    res.render("curso/create") 
  } else {
    await Curso.create({
      sigla: req.body.sigla,
      nome: req.body.nome,
      descricao: req.body.descricao,
      areaId: req.body.area,
    });

    res.redirect("/");


  }
};
async function read(req, res) { };
async function update(req, res) { };
async function remove(req, res) { };

module.exports = { index, read, create, update, remove }