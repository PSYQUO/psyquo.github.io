/** 
 * Abstract class State
 */
class State
{
    /** 
     * Update the state and all its children.
     */
    update()
    {}

    /** 
     * Loads the state (instantiating children)
     */
    load()
    {}

    constructor()
    {
        this._isLoaded = false;

        this.screen = null;
    }
}
