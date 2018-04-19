class SongSelectState extends State
{
    update()
    {}

    load()
    {
        if(this._isLoaded)
            return;

        this.screen = new SongSelectScreen();

        loadJSON('charts/chartlist.json', this._loadSongs.bind(this), null);        
    }

    /**
     * 
     * @param {Object} data
     */
    _loadSongs(data)
    {
        for(let i = 0; i < data.chartlist.length; i++)
        {
            loadJSON('charts/' + data.chartlist[i] + '/songinfo.json', this._addToSongList.bind(this), null);
        }

        this.screen.populateList(this._songList);
    }

    /**
     * 
     * @param {Object} data 
     */
    _addToSongList(data)
    {
        this._songList.push(data);
    }

    constructor()
    {
        super();

        this._songList = [];
    }
}