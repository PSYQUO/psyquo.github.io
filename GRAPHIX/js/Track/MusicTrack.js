class MusicTrack
{
    play()
    {
        this._audio.play();
    }

    pause()
    {
        this._audio.pause();
    }

    stop()
    {
        this._audio.pause();
        this._audio.currentTime = 0;
    }

    /**
     * 
     * @param {Number} time 
     */
    seek(time)
    {
        this._audio.currentTime = this._audio.currentTime + time;
    }

    getCurrentTime()
    {
        return this._audio.currentTime;
    }

    /**
     * 
     * @param {EventListener} func 
     */
    addOnSeekListener(func)
    {
        this._audio.addEventListener('seeking', func, false);
    }

    isPlaying()
    {
        return !this._audio.paused;
    }

    showControlsAt(selector)
    {
        let elem = document.querySelector(selector);
        if(elem != null)
        {
            this._audio.controls = true;
            document.querySelector(selector).appendChild(this._audio);
        }
    }

    /**
     * 
     * @param {String} filename 
     * @param {Number} bpm 
     * @param {Number} offset 
     */
    constructor(filename, bpm, offset)
    {
        this.filename = filename;

        this.bpm = bpm;
        this.offset = offset;

        this._audio = new Audio('resources/' + filename);
        this._audio.volume = 0.5;

    }
}
