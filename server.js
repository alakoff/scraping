//Require npm packages
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// // Require scraping tools
// var axios = require("axios");
// var cheerio = require("cheerio");

// Require all the models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// Routes
require("./routes/article-routes.js")(app);

// // A GET route for scraping the website
// app.get("/scrape", function(req, res) {

//   // Get the body of the html with axios
//   axios.get("https://www.nytimes.com/section/technology").then(function(response) {

//     // Then, we load that into cheerio  save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     // Now, we grab every a tag inside a li tag and do the following:
//     $("li a").each(function(i, element) {

//       // Create empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.title = $(this)
//         .children("h2")
//         .text();
//       result.summary = $(this)
//         .children("p")
//         .text();
//       result.link = 'https://www.nytimes.com'
//       result.link += $(this)
//         .attr("href");
//       result.author = $(this)
//         .children("div")
//         .children("p")
//         .children("span")
//         .text();


//       console.log('new scrape');

//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//         .then(function(dbArticle) {
//           // View the added result in the console
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, log it
//           console.log(err);
//         });
//     });

//     // Send a message to the client
//     res.send("Scraping Complete !");
//   });
// });

// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//   db.Article.find({})
//   .then(function(articles) {
//     res.json(articles)
//   })
//   .catch(function(err){
//     res.json(err);
//   });
// });

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function(req, res) {
//   db.Article.findOne({"_id":req.params.id})
//   .populate("note")
//   .then(function(article){
//     res.json(article);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
//   });


// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function(req, res) {
//   var articleId = req.params.id;
//   console.log('article id var: ',articleId);
//   db.Note.create(req.body)
//   .then(function(dbNote) {
//     console.log(dbNote);
//     return db.Article.findOneAndUpdate({_id:articleId}, { note: dbNote._id }, { new: true });
//   })
//   .then(function(dbNote) {
//     // If the note was updated successfully, send it back to the client
//     res.json(dbNote);
//   })
//   .catch(function(err) {
//     // If an error occurs, send it back to the client
//     res.json(err);
//   });
// });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
