/**
 * 
 * @param {String} path 
 * @param {Function} success 
 * @param {Function} error 
 */

function loadJSON(path, success, error)
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState == XMLHttpRequest.DONE)
        {
            if(xhr.status == 200)
            {
                if(success)
                    success(JSON.parse(xhr.responseText));
            }
            else
            {
                if(error)
                    error(xhr);
            }
        }
    };

    xhr.open("GET", path);
    xhr.send();
}
