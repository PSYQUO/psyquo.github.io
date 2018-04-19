class InputRepository
{
    constructor()
    {
        this.mouseX = 0;
        this.mouseY = 0;

        /**
         * Generates keycode properties "Digit0" to "Digit9".
         */
        for(let i = 0; i <= 9; i++)
        {
            this["Digit" + i] = false;
        }

        /**
         * Generates keycode properties "KeyA" to "KeyZ".
         */
        for(let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++)
        {
            this["Key" + String.fromCharCode(i)] = false;
        }

        /**
         * This is sorted by the KeyboardEvent.code list excluding the letter and number keys.
         *  See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
         */
        this.Escape = false;

        this.Minus = false;
        this.Equal = false;
        this.Backspace = false;
        this.Tab = false;

        this.BracketLeft = false;
        this.BracketRight = false;
        this.Enter = false;
        this.ControlLeft = false;

        this.Semicolon = false;
        this.Quote = false;
        this.Backquote = false;
        this.ShiftLeft = false;
        this.Backslash = false;

        this.Comma = false;
        this.Period = false;
        this.Slash = false;
        this.ShiftRight = false;
        this.NumpadMultiply = false;
        this.AltLeft = false;
        this.Space = false;
        this.CapsLock = false;

        this.Pause = false;
        this.ScrollLock = false;

        this.ArrowUp = false;
        this.ArrowLeft = false;
        this.ArrowRight = false;
        this.ArrowDown = false;
    }
}