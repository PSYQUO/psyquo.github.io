class PlayScreen
{
    update()
    {
        if(DEBUG)
        {
            document.getElementById("x").innerHTML = "camera.x = " + this.camera.position.x.toFixed(3);
            document.getElementById("y").innerHTML = "camera.y = " + this.camera.position.y.toFixed(3);
            document.getElementById("z").innerHTML = "camera.z = " + this.camera.position.z.toFixed(3);
        }
    }

    /**
     * 
     * @param {Stage} stage 
     */
    setStage(stage)
    {
        this.scene.add(stage.group);
    }

    constructor()
    {
        document.body.appendChild(imports.score.cloneNode(true));
        document.body.appendChild(imports.judgement.cloneNode(true));
        document.body.appendChild(imports.info.cloneNode(true));

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            80,
            window.innerWidth / window.innerHeight,
            0.1,
            50
        );
        
        this.camera.translateY(2.5);
        this.camera.translateZ(1);
        this.camera.lookAt(new THREE.Vector3(0, 0, -3));
        this.camera.add(FX.listener);

        if(DEBUG)
        {
            this.scene.add(new THREE.AxesHelper(1));
            document.getElementById("current_screen").innerHTML = "PlayScreen";
        }
    }
}
