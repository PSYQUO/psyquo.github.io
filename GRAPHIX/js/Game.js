/*
    Made by PSYQUO
    https://github.com/PSYQUO
*/

/** 
 * Global THREE.WebGLRenderer
 * @type THREE.WebGLRenderer
 */
var renderer;

/** 
 * Global THREE.Clock
 * @type THREE.Clock
 */
var clock;

/** 
 * Delta time from clock.
 * Updates every animate() call.
 * @type Number
 */
var delta;

/** 
 * Global InputManager
 * @type InputManager
 */
var IM;

/** 
 * Global StateManager
 * @type StateManager
 */
var SM;

/** 
 * Global FXPlayer
 * @type FXPlayer 
 */
var FX;

/** 
 * HTML import variable
 */
var imports = {};

/** 
 * Global Debug Boolean
 * @type Boolean
 */
var DEBUG = false;

function update()
{
    delta = clock.getDelta();

    SM.currState.update();

    if(DEBUG)
    {
        document.getElementById("delta").innerHTML = "delta = " + (delta * 1000).toFixed(1) + " ms";
    }
}

function animate()
{
    update();

    renderer.render(SM.currState.screen.scene, SM.currState.screen.camera);

    requestAnimationFrame(animate);
}

/**
 * 
 * @param {Event} event 
 */
function onWindowResize(event)
{
    if(SM.currState.screen != null)
    {
        SM.currState.screen.camera.aspect = window.innerWidth / window.innerHeight;
        SM.currState.screen.camera.updateProjectionMatrix();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = function()
{
    // TODO: Find a way to dynamically add HTMLElements from import
    let links = this.document.querySelectorAll("link[rel='import']");

    for(var i = 0; i < links.length; i++)
    {
        //@ts-ignore
        imports[links[i].import.querySelector('div').className] = links[i].import.querySelector('div');
    }

    document.body.appendChild(imports.debug.cloneNode(true));

    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer(
    {
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    IM = new InputManager();
    SM = new StateManager();
    FX = new FXPlayer();

    SM.start();

    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    animate();
};

window.oncontextmenu = function()
{
    return false
};