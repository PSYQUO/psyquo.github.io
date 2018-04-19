class VSRGStage extends Stage
{
    _seek()
    {
        console.log(this._conductor.getNormalizedTime());
        this._barLineArray[0].position.z = this._conductor.getNormalizedTime() * this._speed - this._track.offset;
    }

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
                if(this._noteArray[i].mesh.position.z - this._noteArray[i].zoffset > 0 && this._noteArray[i].isValid)
                {
                    this._noteArray[i].isValid = false;
                    this.group.remove(this._noteArray[i].mesh);
                }
                else
                {
                    this._noteArray[i].mesh.translateZ(this._speed * delta);
                }
            }
        }

        if(DEBUG)
        {
            document.getElementById("speed").innerHTML = "speed = " + this._speed;
        }
    }

    /**
     * 
     * @param {Note} note 
     */
    displayJudgement(note)
    {
        let judgement = document.getElementById("judgement");

        switch(note.judgement)
        {
            case 'Perfect':
                judgement.style.color = "#FFFFFF";
                break;
            case 'Good':
                judgement.style.color = "#81C784";
                break;
            case 'Bad':
                judgement.style.color = "#FFEB3B";
                break;
            case 'Miss':
                judgement.style.color = "#F44336";
                break;
        }

        judgement.innerHTML = note.judgement;
        judgement.style.animation = 'none';
        judgement.offsetHeight; /* trigger reflow */
        judgement.style.animation = null;
    }

    /**
     * @param {Note[]} notes
     */
    renderNotes(notes)
    {
        for(let i = 0; i < notes.length; i++)
        {
            let visualNote;

            if(notes[i].endtime != null)
            {
                visualNote = new VisualLongNote((notes[i].endtime - notes[i].starttime) * this._speed);
            }
            else
            {
                visualNote = new VisualNote(0.25);
            }

            visualNote.mesh.translateZ(-(notes[i].starttime * this._speed) - (this._track.offset * this._speed) - visualNote.zoffset - this._visualOffset);

            visualNote.mesh.position.setX(this._lanePositions[notes[i].laneIndex]);

            notes[i].bindMesh(visualNote);
            this._noteArray.push(visualNote);
            this.group.add(visualNote.mesh);
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

        let light = new THREE.PointLight(0xffffff, 4, 52);
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

        // let octGeometry = new THREE.OctahedronGeometry(0.125, 0);
        // let octMaterial = new THREE.MeshPhongMaterial({
        //     color: 0x444444,
        //     specular: 0x200A81,
        //     shininess: 1
        // });
        // let leftOct = new THREE.Mesh(octGeometry, octMaterial);
        // leftOct.translateX(-2.25);
        // this.group.add(leftOct);

        // let rightOct = new THREE.Mesh(octGeometry, octMaterial);
        // rightOct.translateX(2.25);

        // this.group.add(rightOct);

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

        /** @type VisualNote[] */
        this._noteArray = [];

        this._track.addOnSeekListener(this._seek.bind(this));

        // IM.addKeyDownListener(this._handleKeyDown.bind(this));
        // IM.addKeyUpListener(this._handleKeyUp.bind(this));
        // IM.addMouseClickListener(this._handleMouseClick.bind(this));
    }
}