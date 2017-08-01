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

function fetchUserandPhotos(album, albumId)
{
    var albumphotos = $("<div></div>").attr("id", "album-photos");
    album.append(albumphotos);

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

$(document).ready
(
    function()
    {
        // User info
        $.ajax
        ({
            url: root + "/users/" + vars.id,
            method: "GET"
        }).done(function(data)
        {
            $("#header-name").append(data.name);
            $("#header-username").append(" aka \"" + data.username + "\"<br>");
            $("#header-email").append(data.email + "<br>");
            $("#header-address").append(data.address.suite + ", " + data.address.street + ", " + data.address.city + " | ZIP code: " + data.address.zipcode + "<br>");

            var geo = new google.maps.LatLng(data.address.geo.lat, data.address.geo.lng);

            var mapOptions = 
            {
                center: geo,
                zoom: 2,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                mapTypeId: 'roadmap'
            }

            var map = new google.maps.Map(document.getElementById("google-map"), mapOptions);

            var marker = new google.maps.Marker
            ({
                position: geo,
                map: map
            });

            // $("#header-address").hover(function()
            // {
            //     $("#google-map").show();
            // });
            $("#header-phone").append(data.phone + "<br>");
            $("#header-website").append(data.website + "<br>");
            $("#header-companyname").append(data.company.name + "<br>");
            $("#header-companyinfo").append(data.company.catchPhrase + "<br>" + data.company.bs);
        });

        // User posts
        $.ajax
        ({
            url: root + "/posts?userId=" + vars.id,
            method: "GET"
        }).done(function(data)
        {
            for(var i = data.length - 1; i >= data.length - 3; i--)
            {
                var title = $("<span></span>").append(data[i].title + "<br>").attr("id", "post-title");
                var body = $("<span></span>").append(data[i].body + "<br>").attr("id", "post-body");
                var post = $("<div></div>").append(title).append(body).attr("id", "post");

                // for debugging
                // var id = $("<span></span>").append("id = " + dataArr[i].id);
                // var post = $("<div></div>").append(title).append(body).append(id).attr("id", "post");

                $(".posts").append(post);
            }   
            $(".posts").append("<hr>");
        });

        $.ajax
        ({
            url: root + "/albums?userId=" + vars.id,
            method: "GET"
        }).done(function(data)
        {      
            for(var i = data.length - 1; i >= 0 && i >= data.length - 3; i--)
            {
                var title = $("<span></span>").append(data[i].title).attr("id", "album-title");
                var album = $("<div></div>").append(title).attr("id", "album");

                fetchUserandPhotos(album, data[i].id);

                $(".albums").append(album);

            }   
        });

        $(".posts #nav-button").click
        (
            function()
            {
                window.location.href = "index.html?userId=" + vars.id;
            }
        )

        $(".albums #nav-button").click
        (
            function()
            {
                window.location.href = "albums.html?userId=" + vars.id;
            }
        )

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
