class Note
{
    setEndTime(endtime)
    {
        this.endtime = endtime;
    }

    setJudgement(judgement)
    {
        this.judgement = judgement;

        if(judgement != 'Miss')
            FX.playHit();
            
        this._judgementCallback(this);
    }

    /**
     * 
     * @param {Function} callback 
     */
    setOnJudgement(callback)
    {
        this._judgementCallback = callback;
    }

    /**
     * 
     * @param {VisualNote} noteMesh 
     */
    bindMesh(noteMesh)
    {
        this.noteMesh = noteMesh;
    }

    /**
     * 
     * @param {Number} starttime 
     * @param {Number} laneIndex 
     */
    constructor(starttime, laneIndex)
    {
        this.starttime = starttime;
        this.endtime = null;

        this.laneIndex = laneIndex;

        this.judgement = null;
    }
}