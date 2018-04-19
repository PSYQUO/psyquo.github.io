class SongSelectScreen
{
    populateList(songlist)
    {
        console.log(songlist.length);
        for(let i = 0; i < songlist.length; i++)
        {
            console.log(songlist[i]);
            let div = document.createElement("div");

            let title = document.createElement("p");
            title.innerHTML = songlist[i].title;

            div.appendChild(title);

            document.querySelector(".songselect#songlist").appendChild(div);
        }
    }   

    constructor()
    {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            50
        );   

        if(DEBUG)
        {
            document.getElementById("current_screen").innerHTML = "SongSelectScreen";
        }
    }
}