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
                // var id = $("<span></span>").text("id = " + data[i].id);
                var post = $("<div></div>").append(title).append(body).attr("id", "post");

                $(".posts").append(post);
            }   
        });

        $(".posts #nav-button").click
        (
            function()
            {
                window.location.href = "index.html?userId=" + vars.id;
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
    }
);
