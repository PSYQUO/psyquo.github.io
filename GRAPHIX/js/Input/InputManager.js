class InputManager
{
    /**
     * 
     * @param {EventListener} func 
     */
    addKeyDownListener(func)
    {
        window.addEventListener('keydown', func);
    }

    /**
     * 
     * @param {EventListener} func 
     */
    addKeyUpListener(func)
    {
        window.addEventListener('keyup', func);
    }

    /**
     * 
     * @param {EventListener} func 
     */
    addMouseMoveListener(func)
    {
        window.addEventListener('mousemove', func);
    }

    /**
     * 
     * @param {EventListener} func
     */
    addMouseClickListener(func)
    {
        window.addEventListener('click', func);
        window.addEventListener('contextmenu', func);
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {String} event 
     * @param {EventListener} handler 
     */
    addInputListener(element, event, handler)
    {
        element.addEventListener(event, handler);
        // if(inputArray[event] == null)
        //     inputArray[event] = [];

        // inputArray[event].push(handler);
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {String} event 
     * @param {EventListener} handler 
     */
    removeInputListener(element, event, handler)
    {
        element.removeEventListener(event, handler);

        // let index = inputArray[event].indexOf(handler);
        // inputArray[event].splice(index, 1);
    }
}
