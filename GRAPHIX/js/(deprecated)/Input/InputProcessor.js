let instance = null;
let currentInput;

class InputProcessor
{
    isKeyDown(key)
    {
        return currentInput[key];
    }

    // isKeyPressed(key)
    // {
    //     return this.currentInput[key] && !this.previousInput[key];
    // }

    getMousePosition()
    {
        return {
            'x': currentInput.mouseX,
            'y': currentInput.mouseY
        }
    }

    getMouseDeltaPosition()
    {

    }

    p_keyDown(event)
    {
        // this.previousInput[event.code] = this.currentInput[event.code];
        currentInput[event.code] = true;
        // console.log(event.code);
    }

    p_keyUp(event)
    {
        // this.previousInput[event.code] = this.currentInput[event.code];
        currentInput[event.code] = false;
        // console.log(event.code);
    }

    p_mouseMove(event)
    {
        currentInput.mouseX = event.clientX;
        // console.log(event.clientX);
        currentInput.mouseY = event.clientY;
        // console.log(event.clientY);
    }

    /**
     * Notes: bind() or "() =>" to explicitly set "this" to the InputProcessor instance inside keyDown and keyUp.
     *        Calling keyDown or keyUp without bind() or "() =>" will result in "this" being the window instance.
     * See https://stackoverflow.com/questions/2236747/use-of-the-javascript-bind-method
     */
    constructor()
    {
        if(!instance)
        {
            instance = this;

            currentInput = new InputRepository();
            // this.previousInput = new InputRepository();

            window.addEventListener("keyup", () => this.p_keyUp(event), false);
            window.addEventListener("keydown", () => this.p_keyDown(event), false);
            window.addEventListener("mousemove", () => this.p_mouseMove(event), false);
        }

        return instance;
    }
}
