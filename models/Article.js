var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({

  // `title` is required and type string
  title: {
    type: String,
    required: "title is missing !"
  },
  // 'summary is required and type string
  summary: {
    type: String,
    required: "summary is missing !"
  },
  //`link` is required and of type String
  link: {
    type: String,
    required: "link is missing !"
  },
  author: {
    type: String,
    required: 'author is missing !'
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
