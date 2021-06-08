about = (req, res) =>
    res.render("main/about");

ui = (req, res) => 
    res.render("main/ui");

module.exports = { about, ui };