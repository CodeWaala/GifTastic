$(document).ready(function() {

        var topics = ['dogs', 'cats', 'birds', 'fish'];
        AddGiphyButton();

        function AddGiphyButton()
        {
           $('.btn-giphys').empty();
           for(var i = 0; i < topics.length; i++){
               var button = $('<button class="giphys" data-name=' + topics[i] +'>' + topics[i] + '</button>');
               $('.btn-giphys').append(button);
           }
        }

        $('#add-giphy').on('click', function(event) {
            
        event.preventDefault();
         var giphy = $('#giphy-input').val().trim();
        console.log(giphy);
        
        if(giphy)
        {
          topics.push(giphy);

        }

        AddGiphyButton();
        });

        //GetGiphys('dogs');
        function GetGiphys() {

         var topic = $(this).attr('data-name');;
         var apiKey = 'pZc2TyXVvYC81tqgYaWiajR9xIVLPKru';
         var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + topic + '&limit=10&offset=0&rating=G&lang=en';

        $.ajax({
         url : queryUrl,
         Method : 'GET'    
        }).done(function (response) {
           var results = response.data;
           console.log(results);

           for (var i = 0; i < results.length; i++)
           {

            var gifDiv = $('<div style="float:left" class="item">');
            var rating = results[i].rating;
            var p = $('<p>').text("Rating: " + rating);
            var Image = $('<img class="gif img-fluid img-thumbnail">');
            var atage = $('<a>');
            Image.attr("src", results[i].images.fixed_height_still.url);
            Image.attr("data-state", "still");
            Image.attr("data-animate", results[i].images.fixed_height.url);
            Image.attr("data-still", results[i].images.fixed_height_still.url);

            gifDiv.prepend(p);
            gifDiv.prepend(Image);

            $('.giphys-container').append(gifDiv);

           }
        });       
        
        }

        //
        function ClickGiphys() {  
               //console.log(this);
               var state = $(this).attr("data-state");   
               if (state === "still") {   
                   $(this).attr("src", $(this).attr("data-animate"));    
                   $(this).attr("data-state", "animate");   
                } else {    
              $(this).attr("src", $(this).attr("data-still"));  
              $(this).attr("data-state", "still");  
             }   
        }
     
       $(document).on("click", ".giphys", GetGiphys);
       $(document).on("click", ".gif", ClickGiphys);
      });