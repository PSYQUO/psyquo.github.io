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
        this.VSRGProcessor.update();
        this.screen.update();
    }

    _play()
    {
        this.screen.hideInstructions()
        this.track.play();
    }

    _showResults()
    {
        this.screen.showResults(this.VSRGProcessor.getResults());
    }

    /**
     * chartReader calls this once loading is done
     */
    _chartOnLoad()
    {
        this.VSRGProcessor.generateNotes(this.chartReader.chart, this.VSRGStage.displayJudgement.bind(this.VSRGStage));
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

        this.track = new MusicTrack('Purple Stars (Short ver.).mp3', 128, 3.025);
        
        this.trackConductor = new TrackConductor(this.track);
        this.VSRGStage = new VSRGStage(4, this.trackConductor, this.track);

        this.chartReader = new ChartReader();
        this.chartReader.read('Purple Stars/chart.json', this._chartOnLoad.bind(this));

        this.VSRGProcessor = new VSRGProcessor(this.track);
		
        this.screen = new PlayScreen();
        this.screen.setStage(this.VSRGStage);

        this.track.addOnEndedListener(this._showResults.bind(this));

        IM.addInputListener(document.getElementById('instructions'), 'click', this._play.bind(this));

        this._isLoaded = true;
    }

    constructor()
    {
        super();
    }
}