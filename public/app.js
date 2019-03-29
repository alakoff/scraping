// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
  
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + '<strong>Title: </strong>' + data[i].title + '<br /><br />' + '<strong>Summary: </strong>' + data[i].summary + '<br />' + '<strong>Link: </strong>'+ '<a href='+data[i].link+'>'+data[i].link+'</a>' + '<br/>' + '<strong>Author:</strong>' + data[i].author + '</p><hr>');
   }
});


// //Click on the "Get Articles" button
// $(document).on("click", "#btnGetArticles", function(){
//   // Now make an ajax call to scrape the articles
//   $.ajax({
//     method: "GET",
//     url: "/scrape"
//     })
//     .then(function(err,res){
//       if (err) console.log(err);
//       console.log(res);
//       location.reload();
//       res.end();
      
//     }); 
// });


// Whenever someone clicks a p tag
$(document).on("click", "#p", function() {
  console.log('p tag clicked');
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h3>" + data.title + "</h3>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      // A button to delete a note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
  });


// When you click the save note button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });
    // Also, remove the values entered in the input and text area for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

//Click on the delete note button
$(document).on("click", "#deletenote", function() {
  // Grab the article id associated with the node from the button
  var thisId = $(this).attr("data-id");

   // Now make an ajax get call for the Article
   $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId
  })
   // When done
   .then(function(res) {
    // Log the response
    console.log(res);
    // Empty the notes section
    $("#notes").empty();
  });
  }); 



