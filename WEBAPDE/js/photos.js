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
    $("#photo-user").empty();
    var user = $("<span></span>");
    var album = $("<span></span>");
    $("#photo-user").append(user).append(album);

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
            var userlink = $("<span></span").append(data.username).attr("id", "link");
            user.append("by ").append(userlink).append("<br>");

            userlink.click
            (
                function()
                {
                    window.location.href = "users.html?id=" + data.id;
                }
            )
        });

        var albumlink = $("<span></span").append(data[0].title).attr("id", "link");
        album.append("from ").append(albumlink).append("<br>");

        albumlink.click
        (
            function()
            {
                window.location.href = "photos.html?albumId=" + data[0].id;
            }
        )
    });
}

function showPopup(tile)
{
    $(".sidebar").css("filter", "blur(10px)");
    $(".content").css("filter", "blur(10px)");
    $(".popup").css("visibility", "visible");
    $(".popup").css("opacity", "1");

    $("#popup-photo").html("<img id=\"popup-photo-img\" src=\"" + dataArr[dataArr.length - 1 - tile.index()].url + "\"/>");
    $("#photo-title").html(dataArr[dataArr.length - 1 - tile.index()].title + "<br>");
    fetchAlbum(dataArr[dataArr.length -1 - tile.index()].albumId);
}

function displayMore()
{
    var i;
    for(i = pos; i >= 0 && i >= pos - 36 ; i--)
    {
        var thumbnail = $("<div></div>").append("<img src=\"" + dataArr[i].thumbnailUrl + "\"/>");
        var tile = $("<div></div>").append(thumbnail).attr("id", "grid-item");

        // for debugging
        // var id = $("<span></span>").append("id = " + dataArr[i].id);
        // var tile = $("<div></div>").append(thumbnail).append(id).attr("id", "grid-item");

        tile.click(function(){showPopup($(this));}); 

        $(".photo-grid").append(tile);
    } 
    pos = i;
}

$(document).ready
(
    function()
    {
        // if(vars.hasOwnProperty("albumId"))
        // {
        //     var back = $("<div></div>").append("back to previous page").attr("id", "nav-button");

        //     back.click
        //     (
        //         function()
        //         {
        //             window.history.back();
        //         }
        //     );

        //     $(".photos").append(back);
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
            
            for(i = data.length - 1; i >= 0 && i >= data.length - 90; i--)
            {
                var thumbnail = $("<div></div>").append("<img src=\"" + dataArr[i].thumbnailUrl + "\"/>");
                // var id = $("<span></span>").append("id = " + dataArr[i].id);
                var tile = $("<div></div>").append(thumbnail).attr("id", "grid-item");

                tile.click(function(){showPopup($(this));}); 

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

                $("#popup-photo").empty();
                $("#photo-title").empty();
                $("#photo-user").empty();
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

        $("#albums").click
        (
            function()
            {
                window.location.href = "albums.html";
            }
        );
    }
);

