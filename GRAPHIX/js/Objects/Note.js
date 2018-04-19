class Note
{
    setEndTime(endtime)
    {
        this.endtime = endtime;
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

        this.isHit = false;
    }
}