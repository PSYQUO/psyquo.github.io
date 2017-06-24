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
                var body = $("<span></span>").append(data[curIndex].body + "<br>");            
                var id = $("<span></span>").append("id = " + data[curIndex].id);
                var post = $("<div></div>").append(title).append(body).append(id).attr("id", "post");
                fetchUserName(data[curIndex].userId, body);

                $(".posts").append(post);
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