class VSRGStage extends Stage
{
    update()
    {
        if(this._track.isPlaying())
        {
            for(let i = 0; i < this._barLineArray.length; i++)
            {
                this._barLineArray[i].translateZ(this._speed * delta);
                if(this._barLineArray[i].position.z > 0)
                {
                    this._barLineArray[i].position.z -= this._barLineArray.length * (this._speed * this._conductor.beatLength);
                }
            }

            for(let i = 0; i < this._noteArray.length; i++)
            {
                if(this._noteArray[i].object.position.z + this._noteArray[i].zoffset > 0 && this._noteArray[i].isValid)
                {
                    this._noteArray[i].isValid = false;
                    this.group.remove(this._noteArray[i].object);
                }
                else
                {
                    this._noteArray[i].object.translateZ(this._speed * delta);
                }
            }
        }

        if(DEBUG)
        {
            document.getElementById("speed").innerHTML = "speed = " + this._speed;
        }
    }

    flash()
    {

    }

    _seek()
    {
        console.log(this._conductor.getNormalizedTime());
        this._barLineArray[0].position.z = this._conductor.getNormalizedTime() * this._speed - this._track.offset;
    }

    /**
     * @param {Note[]} notes
     */
    renderNotes(notes)
    {
        for(let i = 0; i < notes.length; i++)
        {
            let noteMesh;

            if(notes[i].endtime != null)
            {
                noteMesh = new VisualNote();
            }
            else
            {
                noteMesh = new VisualNote();
            }

            noteMesh.object.translateZ(-(notes[i].starttime * this._speed) - (this._track.offset * this._speed) - noteMesh.zoffset - this._visualOffset);
            noteMesh.object.position.setX(this._lanePositions[notes[i].laneIndex]);

            notes[i].bindMesh(noteMesh);
            this._noteArray.push(noteMesh);
            this.group.add(noteMesh.object);
        }
    }

    /**
     * Constructor for PlayStage. 
     * Initializes lanes and bar lines on the stage.
     * 
     * @param {Number} laneCount 
     * @param {TrackConductor} conductor 
     * @param {MusicTrack} track
     */
    constructor(laneCount, conductor, track)
    {
        super();
        this.focusPoint = new THREE.Vector3(0, 0, -3);

        this._conductor = conductor;
        this._track = track;

        this._chart = null;

        this._lanePositions = [];

        /**
         * lane width = 1, height = 50
         */
        let laneHeight = 50;
        
        let planeGeometry = new THREE.PlaneGeometry(1, laneHeight);

        for(let i = 0; i < laneCount; i++)
        {
            let planeMaterial = new THREE.MeshPhongMaterial(
            {
                color: ColorEnum.LaneColor,
                specular: 0x200A81,
                shininess: 1
            });

            let lane = new THREE.Mesh(planeGeometry, planeMaterial);

            lane.rotateX(-Math.PI / 2);
            lane.translateY(laneHeight / 2);

            if(laneCount % 2 == 0)
            {
                //Even number of lanes
                this._lanePositions.push(-Math.floor(laneCount / 2) + 0.5 + i);
                lane.translateX(this._lanePositions[i]);
            }
            else
            {
                //Odd number of lanes
                this._lanePositions.push(-Math.floor(laneCount / 2) + i);
                lane.translateX(this._lanePositions[i]);
            }

            this.group.add(lane);
        }

        let light = new THREE.PointLight(0xffffff, 3, 52);
        light.translateY(5);
        this.group.add(light);

        // Setup barlines
        let lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(
            new THREE.Vector3(-Math.floor(laneCount / 2), 0, 0),
            new THREE.Vector3(Math.floor(laneCount / 2), 0, 0));

        let lineMaterial = new THREE.LineBasicMaterial(
        {
            color: ColorEnum.LineColor
        });

        let judgeLine = new THREE.Line(lineGeometry, lineMaterial);
        this.group.add(judgeLine);

        /** @type THREE.Line[] */
        this._barLineArray = [];
        this._speed = 20;
        this._visualOffset = 0.050 * this._speed;

        for(let i = 0; i < 8; i++)
        {
            let barLine = new THREE.Line(lineGeometry, lineMaterial);

            barLine.translateZ((i + 1) * -(this._conductor.beatLength * this._speed) - (this._track.offset * this._speed) - this._visualOffset);
            this._barLineArray.push(barLine);
            this.group.add(barLine);
        }

        let skyGeometry = new THREE.SphereGeometry(50, 50, 50);
        let sky = new THREE.TextureLoader().load('resources/purple-sky.jpg');
        sky.wrapS = THREE.RepeatWrapping;
        sky.wrapT = THREE.RepeatWrapping;
        sky.repeat.set(2, 1);

        let skyMesh = new THREE.MeshLambertMaterial(
        {
            map: sky,
        });
        skyMesh.side = THREE.BackSide;

        let skybox = new THREE.Mesh(skyGeometry, skyMesh);
        skybox.translateY(5);

        this.group.add(skybox);

        // let ambientLight = new THREE.AmbientLight(0x111111, 0.1);
        // this.group.add(ambientLight);

        /** @type VisualNote[] */
        this._noteArray = [];

        this._track.addOnSeekListener(this._seek.bind(this));

        // IM.addKeyDownListener(this._handleKeyDown.bind(this));
        // IM.addKeyUpListener(this._handleKeyUp.bind(this));
        // IM.addMouseClickListener(this._handleMouseClick.bind(this));
    }
}