class EditState extends State
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
    }

    load()
    {
        if(this._isLoaded)
            return;

        // let track = new MusicTrack('PLANET__SHAPER.mp3', 147, 0.300);
        // let track = new MusicTrack('Cycling!.mp3', 220, -0.090);
        let track = new MusicTrack('Origamical sweet love.mp3', 192, -0.070);
        
        // this._playtrack = new MetronomeTrack(140);
        this.trackConductor = new TrackConductor(track);
        this.VSRGStage = new VSRGStage(4, this.trackConductor, track);
		
        this.screen = new EditScreen();
        this.screen.setStage(this.VSRGStage);

        track.showControlsAt(".player");

        this._isLoaded = true;
    }

    constructor()
    {
        super();
    }
}