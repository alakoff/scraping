// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // index route loads index.html
  app.get("/", function(req, res) {
    res.render(path.join(__dirname, "../views/index.handlebars"));
  });
};