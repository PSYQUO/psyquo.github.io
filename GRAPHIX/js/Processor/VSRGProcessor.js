class VSRGProcessor
{
    /**
     * 
     * @param {KeyboardEvent} event 
     */
    _handleKeyDown(event)
    {
        switch(event.code)
        {
            case 'KeyD':
                this._checkHit(0);
                break;
            case 'KeyF':
                this._checkHit(1);
                break;
            case 'KeyJ':
                this._checkHit(2);
                break;
            case 'KeyK':
                this._checkHit(3);
                break;
        }
    }

    update()
    {
        if(!this._isLoaded)
            return;

        //@ts-ignore
        document.getElementById("score").innerHTML = (this._score + "").padStart(7, "0");
        
        let currTime = this._track.getCurrentTime() - this._track.offset;

        for(let i = this._globalNoteIndex; i < this.noteArray.length; i++)
        {
            let note = this.noteArray[i];

            if(note.isHit)
            {
                this._globalNoteIndex = i;
                continue;
            }
            else if(note.starttime < currTime - 0.256) // 132 ms late
            {
                document.getElementById("judgement").innerHTML = 'Miss';
                console.log('Note at ' + note.starttime + ' is a Miss');
                note.isHit = true;
              
                this._globalNoteIndex = i;
            }
            else
                return;
        }
    }

    _checkHit(lane)
    {
        let currTime = this._track.getCurrentTime() - this._track.offset;

        for(let i = 0; i < this._noteArrayPerLane[lane].length; i++)
        {
            let note = this._noteArrayPerLane[lane][i];
            if(note.isHit)
            {
                continue;
            }
            else if(note.starttime > currTime - 0.048 && note.starttime < currTime + 0.048) // within 48 ms
            {
                document.getElementById("judgement").innerHTML = 'Perfect';
                // console.log('Note at ' + note.starttime + ' is Perfect (Pressed at ' + currTime + ')');
                note.isHit = true;
                FX.playHit();

                this._score += this._perfectJudgementScore;
                return;
            }
            else if(note.starttime > currTime - 0.112 && note.starttime < currTime + 0.112) // within 112 ms
            {
                document.getElementById("judgement").innerHTML = 'Good';
                // console.log('Note at ' + note.starttime + ' is Good (Pressed at ' + currTime + ')');
                this._noteArrayPerLane[lane][i].isHit = true;
                FX.playHit();
                
                this._score += this._goodJudgementScore;
                return;
            }
            else if(note.starttime > currTime - 0.176 && note.starttime < currTime + 0.176) // within 176 ms
            {
                document.getElementById("judgement").innerHTML = 'Bad';
                // console.log('Note at ' + note.starttime + ' is Bad (Pressed at ' + currTime + ')');
                this._noteArrayPerLane[lane][i].isHit = true;
                FX.playHit();
                
                this._score += this._badJudemenetScore;
                return;
            }
        }
    }

    /**
     * Generates the notes given a JSON chart.
     * @param {Object} chart 
     */
    generateNotes(chart)
    {
        for(let i = 0; i < chart.length; i++)
        {
            let laneIndex;

            switch(chart[i][0])
            {
                case 64:
                    laneIndex = 0;
                    break;
                case 192:
                    laneIndex = 1;
                    break;
                case 320:
                    laneIndex = 2;
                    break;
                case 448:
                    laneIndex = 3;
                    break;
                default:
                    console.log(chart[i][0] + ' is not a standard laneIndex number!');
            }

            let note = new Note(chart[i][2] / 1000, laneIndex);

            if(chart[i][3] > 127) // Hold Note
            {
                note.setEndTime(chart[i][5] / 1000);
            }

            this.noteArray.push(note);
            this._noteArrayPerLane[laneIndex].push(note);
        }

        this._perfectJudgementScore = Math.floor(1000000 / chart.length);
        this._goodJudgementScore = Math.floor(1000000 / chart.length * 0.8);
        this._badJudemenetScore = Math.floor(1000000 / chart.length * 0.5);

        this._isLoaded = true;
    }

    /**
     * 
     * @param {MusicTrack} track 
     */
    constructor(track)
    {
        this._track = track;

        this._score = 0;

        /** 
         * For optimization?
         * @type Note[][] 
         */
        this._noteArrayPerLane = [];
        this._noteArrayPerLane[0] = [];
        this._noteArrayPerLane[1] = [];
        this._noteArrayPerLane[2] = [];
        this._noteArrayPerLane[3] = [];

        /** @type Note[] */
        this.noteArray = [];

        this._globalNoteIndex = 0;

        this._isLoaded = false;

        IM.addKeyDownListener(this._handleKeyDown.bind(this));        
    }
}