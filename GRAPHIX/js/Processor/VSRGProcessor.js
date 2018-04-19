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
                this._judgeHit(0);
                break;
            case 'KeyF':
                this._judgeHit(1);
                break;
            case 'KeyJ':
                this._judgeHit(2);
                break;
            case 'KeyK':
                this._judgeHit(3);
                break;
        }
    }

    getResults()
    {
        return {
            score: this._score,
            maxcombo: this._maxcombo,
            perfect: this._perfect,
            good: this._good,
            bad: this._bad,
            miss: this._miss
        }
    }

    update()
    {
        if(!this._isLoaded)
            return;

        document.getElementById("combo").innerHTML = "x" + this._combo;

        let currTime = this._track.getCurrentTime() - this._track.offset;

        for(let i = this._globalNoteIndex; i < this.noteArray.length; i++)
        {
            let note = this.noteArray[i];

            if(note.judgement != null)
            {
                this._globalNoteIndex = i;
                continue;
            }
            else if(note.starttime < currTime - 0.256) // 256 ms late
            {
                document.getElementById("judgement").innerHTML = 'Miss';
                note.setJudgement('Miss');

                this._globalNoteIndex = i;

                this._combo = 0;
                this._miss++;
            }
            else
                return;
        }
    }

    _judgeHit(lane)
    {
        let currTime = this._track.getCurrentTime() - this._track.offset;

        for(let i = 0; i < this._noteArrayPerLane[lane].length; i++)
        {
            let note = this._noteArrayPerLane[lane][i];

            if(note.judgement != null)
            {
                continue;
            }
            else if(note.starttime > currTime - 0.064 && note.starttime < currTime + 0.064) // within 64 ms
            {
                // console.log('Note at ' + note.starttime + ' is Perfect (Pressed at ' + currTime + ')');
                note.setJudgement('Perfect');
                this._score += this._perfectJudgementScore;
                this._perfect++;
                this._combo++;
                this._updateCombo();
            }
            else if(note.starttime > currTime - 0.128 && note.starttime < currTime + 0.128) // within 128 ms
            {
                // console.log('Note at ' + note.starttime + ' is Good (Pressed at ' + currTime + ')'); 
                note.setJudgement('Good');
                this._score += this._goodJudgementScore;
                this._good++;
                this._combo++;
                this._updateCombo();
            }
            else if(note.starttime > currTime - 0.192 && note.starttime < currTime + 0.192) // within 192 ms
            {
                // console.log('Note at ' + note.starttime + ' is Bad (Pressed at ' + currTime + ')');   
                note.setJudgement('Bad');
                this._score += this._badJudgementScore;
                this._bad++;
                this._combo = 0;
            }

            this._countUp.update(this._score);
            return;
        }
    }

    /**
     * Updates the max combo counter.
     */
    _updateCombo()
    {
        if(this._combo > this._maxcombo)
            this._maxcombo = this._combo;
    }

    /**
     * Generates the notes given a JSON chart.
     * @param {Object} chart 
     * @param {Function} callback
     */
    generateNotes(chart, callback)
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

            note.setOnJudgement(callback);

            this.noteArray.push(note);
            this._noteArrayPerLane[laneIndex].push(note);
        }

        this._perfectJudgementScore = Math.floor(1000000 / chart.length);
        this._goodJudgementScore = Math.floor(1000000 / chart.length * 0.8);
        this._badJudgementScore = Math.floor(1000000 / chart.length * 0.5);

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

        this._combo = 0;
        this._maxcombo = 0;

        this._perfect = 0;
        this._good = 0;
        this._bad = 0;
        this._miss = 0;

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

        let countUpOptions = {  
            useEasing: true,
            useGrouping: true,
        };

        this._countUp = new CountUp('score', 0, 0, 0, 1, countUpOptions);

        IM.addKeyDownListener(this._handleKeyDown.bind(this));
    }
}