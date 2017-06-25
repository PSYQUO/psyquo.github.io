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

var dataArr = [];
var pos;

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
            
            $("#photo-user").empty();
            $("#photo-user").append(user);
        });
    });
}

function displayMore()
{
    var i;
    for(i = pos; i >= pos - 36 && i >= 0; i--)
    {
        var thumbnail = $("<div></div>").append("<img src=\"" + dataArr[i].thumbnailUrl + "\"/>");
        // var id = $("<span></span>").append("id = " + dataArr[i].id);
        var tile = $("<div></div>").append(thumbnail).attr("id", "grid-item");

        tile.click
        (
            function()
            {
                $(".sidebar").css("filter", "blur(10px)");
                $(".content").css("filter", "blur(10px)");
                $(".popup").css("visibility", "visible");
                $(".popup").css("opacity", "1");

                console.log((dataArr.length) - $(this).index());

                $("#popup-photo").html("<img src=\"" + dataArr[dataArr.length - 1 - $(this).index()].url + "\"/>");
                $("#photo-title").html(dataArr[dataArr.length - 1 - $(this).index()].title + "<br>");
                fetchAlbum(dataArr[dataArr.length -1 - $(this).index()].albumId);
            } 
        ); 

        $(".photo-grid").append(tile);
    } 

    pos = i;
}

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

        // Photo
        $.ajax
        ({
            url: root + "/photos" + query,
            method: "GET"
        }).done(function(data)
        {
            var i;

            for(i = 0; i < data.length; i++)
                dataArr.push(data[i]);
            
            for(i = data.length - 1; i >= data.length - 90; i--)
            {
                var thumbnail = $("<div></div>").append("<img src=\"" + dataArr[i].thumbnailUrl + "\"/>");
                // var id = $("<span></span>").append("id = " + dataArr[i].id);
                var tile = $("<div></div>").append(thumbnail).attr("id", "grid-item");

                tile.click
                (
                    function()
                    {
                        $(".sidebar").css("filter", "blur(10px)");
                        $(".content").css("filter", "blur(10px)");
                        $(".popup").css("visibility", "visible");
                        $(".popup").css("opacity", "1");

                        console.log((dataArr.length) - $(this).index());

                        $("#popup-photo").html("<img src=\"" + dataArr[dataArr.length - 1 - $(this).index()].url + "\"/>");
                        $("#photo-title").html(dataArr[dataArr.length - 1 - $(this).index()].title + "<br>");
                        fetchAlbum(dataArr[dataArr.length -1 - $(this).index()].albumId);
                    } 
                ); 

                $(".photo-grid").append(tile);               
            } 
            pos = i;   
        });

        $(".content").on('scroll', function()
        { 
            if($(".content").scrollTop() + $(".content").innerHeight() >= $(".content")[0].scrollHeight)
            { 
                displayMore();
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

