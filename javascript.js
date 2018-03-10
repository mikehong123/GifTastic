$(document).ready(function() {

    var topics = [];
    
        function displayLike() {
    
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=we5xquY68ucIxH5W0NNjD39pUpu1Vnql&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var dayDiv = $("<div class='col-md-4'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var dayImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                dayImage.attr("src", staticSrc);
                dayImage.addClass("dayGiphy");
                dayImage.attr("data-state", "still");
                dayImage.attr("data-still", staticSrc);
                dayImage.attr("data-animate", defaultAnimatedSrc);
                dayDiv.append(p);
                dayDiv.append(dayImage);
                $("#gifArea").prepend(dayDiv);
    
            }
        });
    }
    
        $("#addday").on("click", function(event) {
            event.preventDefault();
            var newday = $("#dayInput").val().trim();
            topics.push(newday);
            console.log(topics);
            $("#dayInput").val('');
            displayButtons();
          });
    
        function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "day");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#myButtons").append(a);
        }
      }
    
    
      displayButtons();
    
      $(document).on("click", "#day", displayLike);
    
      $(document).on("click", ".dayGiphy", pausePlayGifs);
    
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });
