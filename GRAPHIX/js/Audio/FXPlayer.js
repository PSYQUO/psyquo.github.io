class FXPlayer
{
    tickMetronome()
    {
        if(this._metronome.isPlaying)
            this._metronome.stop();
        this._metronome.play();
    }

    playHit()
    {
        if(this._hitsound.isPlaying)
            this._hitsound.stop();
        this._hitsound.play();
    }

    constructor()
    {
        this.listener = new THREE.AudioListener();
        this.loader = new THREE.AudioLoader();

        this._metronome = new THREE.Audio(this.listener);
        this._metronome.setVolume(0.5);
        this.loader.load('resources/metronome_click.mp3', function(buffer)
            {
                this._metronome.setBuffer(buffer);
            }.bind(this),
            function(xhr) {},
            function(error) {}
        );

        this._hitsound = new THREE.Audio(this.listener);
        this._hitsound.setVolume(0.25);
        this.loader.load('resources/hitsound.mp3', function(buffer)
            {
                this._hitsound.setBuffer(buffer);
            }.bind(this),
            function(xhr) {},
            function(error) {}
        );
    }
}