$( document ).ready(function() {



$(document).on("click", ".image", function(){

    var state = $(this).attr('data-state');

    if ( state == 'still')

    {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

    else

    {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }

});

$(document).on("click", ".stuff", displayGifs);


var stuffs = ["French Toast", "Food", "Cooking", "Reading", "Books", "Eating", "Eating", "Shooting", "Sleeping", "Dreaming","Chicken", "Burritos", "Memes"];

function blueGifButton(){

    $("#gifsHere").empty();

    for (var i = 0; i < stuffs.length; i++)

    {
        var gifButton = $("<button>");

        gifButton.addClass("stuff");

        gifButton.addClass("btn btn-primary")

        gifButton.attr("data-name", stuffs[i]);

        gifButton.text(stuffs[i]);

        $("#gifsHere").append(gifButton);

    }

}

blueGifButton();


function addNewStuff()
{
    $("#addGif").on("click", function()
    {
    var stuff = $("#stuff-input").val().trim();
    if (stuff == "")
    {
      alert ("You Haven't Written Anything Fool")
      return false;
      
    }

    stuffs.push(stuff);

    blueGifButton();
    return false;

    });
}

addNewStuff();

function destroythepage()
{
    $("removeGif").on("click", function()
    {
    stuffs.pop(stuff);

    blueGifButton();

    return false;

    });

}

destroythepage();

function displayGifs()
{
    var stuff = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + stuff + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) 
    {
        console.log(response);
        $("#stuffGoesHere").empty();
        var results = response.data;
        if (results == "")
        {
          alert("No Gifs Were Found, Sorry, Write A New Word");
        }

        for (var i=0; i<results.length; i++)
        {

            var gifDiv = $("<div>");

            gifDiv.addClass("gifDiv");

            var gifRating = $("<p>").text("Rating: " + results[i].rating);

            gifDiv.append(gifRating);

            var displayGif = $("<img>");

            displayGif.attr("src", results[i].images.fixed_height_small_still.url);

            displayGif.attr("data-still",results[i].images.fixed_height_small_still.url);

            displayGif.attr("data-animate",results[i].images.fixed_height_small.url);

            displayGif.addClass("image");

            gifDiv.append( displayGif);

            $("#stuffGoesHere").prepend(gifDiv);
        }
    });
}


});
