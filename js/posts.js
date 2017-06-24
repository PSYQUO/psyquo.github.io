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

function fetchUserName(userId, body) // Works because of object reference
{
    $.ajax
    ({
        url: root + "/users/" + userId,
        method: "GET"
    }).done(function(data)
    {
        var link = $("<span></span").append(data.username).attr("id", "post-user");
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

var curIndex;

$(document).ready
(
    function()
    {
        if(vars.hasOwnProperty("userId"))
        {
            var back = $("<div></div>").append("back to Profile").attr("id", "nav-button");

            back.click
            (
                function()
                {
                    window.history.back();
                }
            );

            $(".posts").append(back);
        }

        // Posts
        $.ajax
        ({
            url: root + "/posts" + query,
            method: "GET"
        }).done(function(data)
        {
            // for(curIndex = data.length - 1; curIndex >= data.length - 10 && curIndex >= 0; curIndex--)
            for(curIndex = data.length - 1; curIndex >= 0; curIndex--)
            {
                var title = $("<span></span>").append(data[curIndex].title + "<br>").attr("id", "post-title");
                var body = $("<span></span>").append(data[curIndex].body + "<br>").attr("id", "post-body");
                var id = $("<span></span>").append("id = " + data[curIndex].id);
                var post = $("<div></div>").append(title).append(body).append(id).attr("id", "post");
                fetchUserName(data[curIndex].userId, body);

                $(".posts").append(post);
            }              
        });

        
        // $(".content").on('scroll', function()
        // { 
        //     console.log($(".content").scroll());
        //     console.log($(".content").height());

        //     if($(".content").scrollTop() > $(".content").height() - 100)
        //     { 
        //         for(; index >= datwo.length - 10 && index >= 0; index--)
        //         {
        //             var title = $("<span></span>").append(datwo[index].title + "<br>").attr("id", "post-title");
        //             var body = $("<span></span>").append(datwo[index].body + "<br>");            
        //             var id = $("<span></span>").append("id = " + datwo[index].id);
        //             var post = $("<div></div>").append(title).append(body).append(id).attr("id", "post");
        //             fetchUserName(datwo[index].userId, body);

        //             $(".posts").append(post);
        //         } 
        //     }
        // });
         
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