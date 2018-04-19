
class MetronomeTrack
{
    play()
    {
        this._isPlaying = true;
        this._starttime = performance.now() / 1000 - this._deltatime;
    }

    pause()
    {
        if(!this._isPlaying)
            return;

        this._isPlaying = false;
        this._deltatime = performance.now() / 1000;
    }

    stop()
    {
        if(!this._isPlaying)
            return;

        this._isPlaying = false;
        this._deltatime = performance.now() / 1000;
    }

    /**
     * 
     * @param {Number} time 
     * @param {Number} scale 
     */
    seekForward(time, scale)
    {}

    /**
     * 
     * @param {Number} time 
     * @param {Number} scale 
     */
    seekBack(time, scale)
    {}

    getCurrentTime()
    {
        if(this._isPlaying)
            return performance.now() / 1000 - this._deltatime;

        return 0;
    }

    isPlaying()
    {
        return this._isPlaying;
    }

    /**
     * 
     * @param {Number} bpm 
     */
    constructor(bpm)
    {
        this.filename = "//METRONOME\\\\";
        this.bpm = bpm;
        this.offset = 0;

        this._isPlaying = false;
        this._starttime = performance.now() / 1000;
        this._deltatime = performance.now() / 1000;
    }
}