class PlayState extends State
{
    update()
    {
        if(!this._isLoaded)
        {
            console.log("Controller has not been loaded yet");
            return;
        }

        this.trackConductor.update();
        this.VSRGStage.update();
        this.screen.update();
        this.VSRGProcessor.update();
    }


    /**
     * chartReader calls this once loading is done
     */
    _chartOnLoad()
    {
        this.VSRGProcessor.generateNotes(this.chartReader.chart);
        this.VSRGStage.renderNotes(this.VSRGProcessor.noteArray);
    }

    load()
    {
        if(this._isLoaded)
            return;

        // let track = new MusicTrack('PLANET__SHAPER.mp3', 147, 0.300);
        // let track = new MusicTrack('PLANET__SHAPER.mp3', 147, 0.300);
        // let track = new MusicTrack('Cycling!.mp3', 220, -0.090);
        // let track = new MusicTrack('Origamical sweet love.mp3', 192, -0.070);

        // this._playtrack = new MetronomeTrack(140); 

        let track = new MusicTrack('Purple Stars (Short ver.).mp3', 128, 3.025);
        
        this.trackConductor = new TrackConductor(track);
        this.VSRGStage = new VSRGStage(4, this.trackConductor, track);

        this.chartReader = new ChartReader();
        this.chartReader.read('Purple Stars/chart.json', this._chartOnLoad.bind(this));

        this.VSRGProcessor = new VSRGProcessor(track);
		
        this.screen = new PlayScreen();
        this.screen.setStage(this.VSRGStage);

        this._isLoaded = true;
    }

    constructor()
    {
        super();
    }
}