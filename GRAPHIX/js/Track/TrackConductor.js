class TrackConductor
{
    update()
    {
        // if(!AM.audiotrack.paused)
        // {

        if(this._track.isPlaying() && this._track.getCurrentTime() > this.beatLength + this._lastBeatTime + this._track.offset)
        {
            this._beatIndex += 1;
            this._lastBeatTime += this.beatLength;

            // AM.tick ();
        }
        // else if(AM.audiotrack.currentTime < beatlength * 2 + lastbeatTime + offset)
        // {
        //     if(beatindex == 1)
        //         beatindex = 4;
        //     else
        //         beatindex -= 1;

        //     lastbeatTime -= beatlength;

        //     if(metronome.isPlaying)
        //     {
        //         metronome.stop()
        //     }
        //     metronome.play();
        // }
        // }

        if(DEBUG)
        {
            document.getElementById('bar_index').innerHTML = (this._beatIndex - 1) % 4 + 1 + '/4';
            document.getElementById('beat_index').innerHTML = 'beat_index = ' + this._beatIndex;
            document.getElementById('time').innerHTML = 'song_time = ' + this._track.getCurrentTime().toFixed(3) + ' s';
            document.getElementById('offset').innerHTML = 'offset = ' + this._track.offset.toFixed(3) + ' ms';
        }
    }

    /** 
     * 
     */
    getNormalizedTime()
    {
        return this._lastBeatTime + this.beatLength - this._track.getCurrentTime();
    }

    /**
     * 
     * @param {KeyboardEvent} event 
     */
    _handleKeyDown(event)
    {
        switch(event.code)
        {
            case 'BracketRight':
                this._track.play();
                console.log('play');
                break;

            case 'BracketLeft':
                this._track.pause();
                console.log('pause');
                break;

            case 'Backslash':
                this._track.stop();
                this._resetConductor();
                console.log('stop');
                break;

            case 'ArrowRight':
                this._track.seek(this.beatLength / 4);
                console.log('seek 1/2 beat ahead');
                break;

            case 'ArrowLeft':
                this._track.seek(-this.beatLength / 4);
                console.log('seek 1/2 beat behind');
                break;

            case 'ArrowUp':
                this._track.offset += 0.001;
                console.log('offset + 0.001 ms');
                break;

            case 'ArrowDown':
                this._track.offset -= 0.001;
                console.log('offset - 0.001 ms');
                break;
        }
    }

    /**
     * Seek EventListener function for TrackConductor.
     * 
     * beatIndex is caculated by dividing timeAfterSeek (minus offset) with the beatLength.
     * 
     * lastBeatTime is then shifted* based on the delta of beatIndexAferSeek and beatIndex.
     * 
     * Note: shifted - lastBeatTime should never be set, only increment or decrement to avoid floating point inaccuracies.
     */
    _seek()
    {
        let timeAfterSeek = this._track.getCurrentTime();
        let beatIndexAfterSeek;

        if(timeAfterSeek < 0)
        {
            this._resetConductor();
        }
        else
        {
            // if(time < 0)
            //     // beatIndexAfterSeek = Math.ceil((timeAfterSeek - this.track.offset) / this.beatLength);
            // else
            beatIndexAfterSeek = Math.floor((timeAfterSeek - this._track.offset) / this.beatLength);

            this._lastBeatTime = this._lastBeatTime + ((beatIndexAfterSeek - this._beatIndex) * this.beatLength);
            this._beatIndex = beatIndexAfterSeek;
        }
    }

    _resetConductor()
    {
        this._lastBeatTime = 0;
        this._beatIndex = 1;
    }

    /**
     * 
     * @param {MusicTrack} track 
     */
    constructor(track)
    {
        this._resetConductor();
        this._track = track;
        this.beatLength = 60 / track.bpm;
        this._resetConductor();

        IM.addKeyDownListener(this._handleKeyDown.bind(this));

        if(DEBUG)
        {
            document.getElementById('title').innerHTML = this._track.filename;
            document.getElementById('beat_length').innerHTML = 'beat_length = ' + this.beatLength + " ms";
            document.getElementById('BPM').innerHTML = 'BPM = ' + this._track.bpm;
        }

        this._track.addOnSeekListener(this._seek.bind(this));
    }
}
