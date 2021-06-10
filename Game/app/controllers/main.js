about = (req, res) => res.render("main/about");

ui = (req, res) => res.render("main/ui");

game = (req, res) => res.render("main/game");

module.exports = { about, ui, game };
