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

function fetchAlbum(albumId)
{
    $.ajax
    ({
        url: root + "/albums?id=" + albumId,
        method: "GET"
    }).done(function(data)
    {
        $.ajax
        ({
            url: root + "/users/" + data[0].userId,
            method: "GET"
        }).done(function(data)
        {

            var link = $("<span></span").append(data.username).attr("id", "photo-username");
            var user = $("<span></span>").append("by ").append(link).append("<br>");

            link.click
            (
                function()
                {
                    window.location.href = "users.html?id=" + data.id;
                }
            )
            
            $("#photo-user").html(user);
        });
    });
}

var dataArr = [];

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
        }).done(function(data)
        {
            for(var i = data.length - 1; i >= data.length - 100; i--)
            {
                var thumbnail = $("<div></div>").append("<img src=\"" + data[i].thumbnailUrl + "\"/>");
                var id = $("<span></span>").append("id = " + data[i].id);
                var tile = $("<div></div>").append(thumbnail).append(id).attr("id", "grid-item");

                // tile.refData = data[i];
                dataArr.push(data[i]);

                tile.click
                (
                    function()
                    {
                        $(".sidebar").css("filter", "blur(10px)");
                        $(".content").css("filter", "blur(10px)");
                        $(".popup").css("visibility", "visible");
                        $(".popup").css("opacity", "1");

                        $("#popup-photo").html("<img src=\"" + dataArr[$(this).index()].url + "\"/>");
                        $("#photo-title").html(dataArr[$(this).index()].title + "<br>");
                        fetchAlbum(dataArr[$(this).index()].albumId);
                    } 
                ); 

                $(".photo-grid").append(tile);
            }            
        });

        $(".popup").click
        (
            function()
            {
                $(".sidebar").css("filter", "none");
                $(".content").css("filter", "none");
                $(".popup").css("visibility", "hidden");
                $(".popup").css("opacity", "0");
            }
        );
         
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

