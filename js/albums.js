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

function fetchUserandPhotos(album, albumId, userId)
{
    var user = $("<span></span>");
    album.append(user);

    var moreimg = $("<div></div>").append("<img src=\"icons/next.png\">").attr("id", "more-img");
    var moretext = $("<div></div>").append("See all");
    var more = $("<div></div>").append(moreimg).append(moretext).attr("id", "more-button");


    album.append(more);

    var albumphotos = $("<div></div>").attr("id", "album-photos");
    album.append(albumphotos);

    $.ajax
    ({
        url: root + "/users/" + userId,
        method: "GET"
    }).done(function(data)
    {
        var link = $("<span></span").append(data.username).attr("id", "link");
        user.append(" by ").append(link).append("<br>");

        link.click
        (
            function()
            {
                window.location.href = "users.html?id=" + userId;
            }
        );
    });

    $.ajax
    ({
        url: root + "/photos?albumId=" + albumId,
        method: "GET"
    }).done(function(data)
    {
        for(var k = 0; k < 10; k++)
        {
            var rng = Math.floor(Math.random() * data.length);

            var photo = $("<div></div>").append("<img src=\"" + data[rng].thumbnailUrl + "\"/>").attr("id", "album-thumbnails");

            albumphotos.append(photo);
        }

        album.append(albumphotos);
    });
}

function displayMore()
{
    var i;

    for(i = pos - 1; i >= 0 && i >= pos - 10; i--)
    {
        var title = $("<span></span>").append(dataArr[i].title).attr("id", "album-title");
        var album = $("<div></div>").append(title).attr("id", "album");

        fetchUserandPhotos(album, dataArr[i].id, dataArr[i].userId);

        $(".albums").append(album);

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

        // Album
        $.ajax
        ({
            url: root + "/albums" + query,
            method: "GET"
        }).done(function(data)
        {
            var i;

            for(i = 0; i < data.length; i++)
                dataArr.push(data[i]);
            
            for(i = data.length - 1; i >= 0 && i >= data.length - 10; i--)
            {
                var title = $("<span></span>").append(dataArr[i].title).attr("id", "album-title");

                var album = $("<div></div>").append(title).attr("id", "album");

                fetchUserandPhotos(album, data[i].id, data[i].userId);

                $(".albums").append(album);

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
