class StateManager
{
    start()
    {
        // this._songSelectState = new SongSelectState();
        // this._songSelectState.load();

        this._playState = new PlayState();
        this._playState.load();

        // this._editorState = new EditState();
        // this._editorState.load();
        
        this.currState = this._playState;
    }

    constructor()
    {
        this.currState = null;
    }
}
