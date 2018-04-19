class ChartReader
{
    /**
     * 
     * @param {String} chartpath
     * @param {Function} callback
     */
    read(chartpath, callback)
    {
        loadJSON('charts/' + chartpath, this._loadChart.bind(this), null); 

        this.callback = callback;
    }

    /**
     * 
     * @param {Object} data 
     */
    _loadChart(data)
    {
        this.chart = data.notes;
        this.loaded = true;
        this.callback(this.chart);
    }

    constuctor(stageCallback)
    {
        this.chart = null;
        this.isLoaded = false;       
        this.stageCallback = stageCallback;         
    }
}