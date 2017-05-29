      // Initial array of gifs
      var gifs = ["Sad", "Happy", "Ecstatic", "Joy"];
      var gifDetails=$("<div>");
      gifDetails.addClass("itemDetails-div");
       $('body').append(gifDetails);
     //$('html').css("background-image", 'url(https://giphy.com/embed/dI3D3BWfDub0Q)'); 
      // to display the first 10 gif elements
      function displaygifInfo() 
      {
        var item = $(this).attr("data-name");
          var queryURL = "https://api.giphy.com/v1/gifs/search?q="+item+"&api_key=dc6zaTOxFJmzC"
          //  AJAX call for the gif button
          $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
          //  console.log(JSON.stringify(response));
              $(".itemDetails-div").empty();
              for(var i=0;i<response.data.length;i++)
              {
                console.log(response.data[i].images.fixed_height.url);
                var newDiv=$('<div>')
                newDiv.addClass("giFrame")
                //var newFrame=$("<embed>");
                //var newFrame=$("<iframe>");
                var newFrame=$("<img>");
                newFrame.addClass("gifItem")
               // newFrame.attr("src",response.data[i].embed_url);
                newFrame.attr("data-animate",response.data[i].images.original.url);
                newFrame.attr("data-still",response.data[i].images.original_still.url);
                newFrame.attr("src",response.data[i].images.original_still.url);
                //newFrame.attr("src",response.data[i].embed_url);
                newFrame.attr("data-state","static");
                newFrame.attr("height","200px");
                newFrame.attr("width","200px");
                newDiv.append("<font>Rating: "+response.data[i].rating+"</font");
                newDiv.append(newFrame);
                $(".itemDetails-div").append(newDiv);
              }
    
          });
       
      }

      function gifClick()
      {
        var ani=$(this).attr("data-animate");
        var stl=$(this).attr("data-still");
        var s=$(this).attr("src");
        if(s===stl)
        {
          $(this).attr("src",ani)
        }
        else
        {
          $(this).attr("src",stl)
        }
      }
      // Function for displaying gif data
      function renderButtons() {

        $("#buttons-view").empty();
        for (var i = 0; i < gifs.length; i++) 
        {
          var a = $("<button>");
          a.addClass("gif");
          a.attr("data-name", gifs[i]);
          a.text(gifs[i]);
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add gif button is clicked
      $("#add-gif").on("click", function(event) 
      {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        console.log("gif= "+gif);
        if(gif!="")
        {
          gifs.push(gif);
          renderButtons();
          $("#gif-input").val("");
        }
      });

      // Adding click event to class "gif"
      $(document).on("click", ".gif", displaygifInfo);
      $(document).on("click", ".gifItem", gifClick);
      //$(".gifItem").on("click",gifClick);
      //to display the innitail array buttons.
      renderButtons();