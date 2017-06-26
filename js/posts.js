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

function fetchUserName(userId, body) // Works because of object reference
{
    $.ajax
    ({
        url: root + "/users/" + userId,
        method: "GET"
    }).done(function(data)
    {
        var link = $("<span></span").append(data.username).attr("id", "link");
        var user = $("<span></span>").append("by ").append(link).append("<br>");

        link.click
        (
            function()
            {
                window.location.href = "users.html?id=" + data.id;
            }
        )
        
        body.append(user);
    });
}

function displayMore()
{
    var i;
    for(i = pos; i >= 0 && i >= pos - 10 ; i--)
    {
        var title = $("<span></span>").append(dataArr[i].title + "<br>").attr("id", "post-title");
        var body = $("<span></span>").append(dataArr[i].body + "<br>").attr("id", "post-body");
        var post = $("<div></div>").append(title).append(body).attr("id", "post");

        // for debugging
        // var id = $("<span></span>").append("id = " + dataArr[i].id);
        // var post = $("<div></div>").append(title).append(body).append(id).attr("id", "post");

        fetchUserName(dataArr[i].userId, body);

        $(".posts").append(post);
    } 

    pos = i;
}

$(document).ready
(
    function()
    {
        if(vars.hasOwnProperty("userId"))
        {
            var back = $("<div></div>").append("back to Profile").attr("id", "nav-button");
            back.click(function(){window.history.back();});
            $(".posts").append(back);
        }

        // Posts
        $.ajax
        ({
            url: root + "/posts" + query,
            method: "GET"
        }).done(function(data)
        {
            var i;

            for(i = 0; i < data.length; i++)
                dataArr.push(data[i]);

            for(i = data.length - 1; i >= 0 && i >= data.length - 10; i--)
            {
                var title = $("<span></span>").append(dataArr[i].title + "<br>").attr("id", "post-title");
                var body = $("<span></span>").append(dataArr[i].body + "<br>").attr("id", "post-body");
                var post = $("<div></div>").append(title).append(body).attr("id", "post");

                // for debugging
                // var id = $("<span></span>").append("id = " + dataArr[i].id);
                // var post = $("<div></div>").append(title).append(body).append(id).attr("id", "post");
                
                fetchUserName(dataArr[i].userId, body);

                $(".posts").append(post);
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