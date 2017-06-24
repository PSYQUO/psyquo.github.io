var root = 'https://jsonplaceholder.typicode.com';

var vars = [], hash;
var query = "?" + window.location.href.slice(window.location.href.indexOf('?') + 1);
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

for(var i = 0; i < hashes.length; i++)
{
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1]; // Object attribute
}

var data;

$(document).ready
(
    function()
    {
        // if(vars.hasOwnProperty("userId"))
        // {
        //     var back = $("<div></div>").append("back to Profile").attr("id", "nav-button");

        //     back.click
        //     (
        //         function()
        //         {
        //             window.history.back();
        //         }
        //     );

        //     $(".posts").append(back);
        // }

        // Posts
        $.ajax
        ({
            url: root + "/photos" + query,
            method: "GET"
        }).done(function(fetchedData)
        {

            data = fetchedData;
            // for(curIndex = data.length - 1; curIndex >= data.length - 10 && curIndex >= 0; curIndex--)
            // for(curIndex = data.length - 1; curIndex >= data.length - 100; curIndex--)
            // {
            //     var thumbnail = $("<div></div>").append("<img src=\"" + data[curIndex].thumbnailUrl + "\"/>");
            //     var id = $("<span></span>").append("id = " + data[curIndex].id);
            //     var gridItem = $("<div></div>").append(thumbnail).append(id).attr("id", "grid-item");

            //     // thumbnail.click
            //     // (
            //     //     function()
            //     //     {
            //     //         $(".sidebar").css("filter", "blur(10px)");
            //     //         $(".content").css("filter", "blur(10px)");
            //     //         $(".popup").css("visibility", "visible");
            //     //         $(".popup").css("opacity", "0.4");

            //     //         $("#popup-photo").append("<img src=\"" + [curIndex].url + "\"/>");
            //     //     } 
            //     // );

            //     $(".photo-grid").append(gridItem);
            // }

            for(var i = data.length - 1; i >= data.length - 100; i--)
            {
                var thumbnail = $("<div></div>").append("<img src=\"" + data[i].thumbnailUrl + "\"/>");
                var id = $("<span></span>").append("id = " + data[i].id);
                var tile = $("<div></div>").append(thumbnail).append(id).attr("id", "grid-item");

                tile.click
                (
                    function()
                    {
                        $(".sidebar").css("filter", "blur(10px)");
                        $(".content").css("filter", "blur(10px)");
                        $(".popup").css("visibility", "visible");
                        $(".popup").css("opacity", "0.4");
                    } 
                ); 

                $(".photo-grid").append(tile);
            }               
        });
         
        $("#home").click
        (
            function()
            {
                window.location.href = "index.html";
            }
        );    

        $("#photos").click
        (
            function()
            {
                window.location.href = "photos.html";
            }
        );  
    }
);

