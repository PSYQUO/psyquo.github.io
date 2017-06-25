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

var DD = [];
var tileArr;

// function addTileClick(tile, data)
// {
//     tile.refData = data;

//     tile.click
//     (
//         function()
//         {
//             $(".sidebar").css("filter", "blur(10px)");
//             $(".content").css("filter", "blur(10px)");
//             $(".popup").css("visibility", "visible");
//             $(".popup").css("opacity", "0.4");

//             console.log(this.refData);

//             console.log(DD);

//             $("#popup-photo").append("<img src=\"" + this.refData + "\"/>");
//         } 
//     ); 
// }

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

                data[i].tile = tile;

                tile.click
                (
                    function()
                    {
                        $(".sidebar").css("filter", "blur(10px)");
                        $(".content").css("filter", "blur(10px)");
                        $(".popup").css("visibility", "visible");
                        $(".popup").css("opacity", "0.4");

                        for(var k = 0; k < DD.length; k++)
                            console.log(DD[k].tile);
                    } 
                ); 

                $(".photo-grid").append(tile);
            }           

            DD = data;    
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

