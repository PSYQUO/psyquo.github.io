/*
    Made by PSYQUO
    https://github.com/PSYQUO
*/

var scene, camera, renderer, clock, delta;
var paused = false;

var directionalLight;

var objsArray;
var redMaterial, whiteMaterial;
var cubeArray = [];
var floor, floorGeometry, floorSize;

var camhelper, axisHelper, lightHelper;

function initializeScene()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);

    renderer = new THREE.WebGLRenderer(
    {
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    console.log(document.pointerLockElement === renderer.domElement);

    document.body.appendChild(renderer.domElement);
    document.body.requestPointerLock();

    clock = new THREE.Clock();
}

function initializeLights()
{
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);
}

function initializeObjects()
{
    floorSize = 8;

    redMaterial = new THREE.MeshBasicMaterial(
    {
        color: 0xf01414
    });
    whiteMaterial = new THREE.MeshBasicMaterial(
    {
        color: 0xffffff
    });

    objsArray = new THREE.Group();

    for (var i = 0; i < 4; i++)
    {
        var size = 1;
        cubeArray[i] = new THREE.Mesh(new THREE.BoxBufferGeometry(floorSize / 4, size / 2, size / 2), redMaterial);

        size /= 2;
        cubeArray[i].position.x = randomGridPosition();
        cubeArray[i].position.y = size;
        cubeArray[i].position.z = (floorSize / 5) * (i + 1) * -1;

        objsArray.add(cubeArray[i]);
    }

    floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize * 4);
    floor = new THREE.Mesh(floorGeometry, whiteMaterial);
    //floor.position.set(floorSize, 0, floorSize);
    floor.rotation.x -= Math.PI / 2;
    objsArray.add(floor);

    scene.add(objsArray);
}

function randomGridPosition()
{
    return THREE.Math.randInt(-2, 1) * floorSize / 4 + 1;
}

function setupScene()
{
    camera.position.set(0, 3, 8);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // camera.add(listener);
    // sound.play();
}



function addHelpers()
{
    // camhelper = new THREE.CameraHelper(camera);
    // scene.add(camhelper);
    // lightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    scene.add(lightHelper);
    axisHelper = new THREE.AxisHelper(floorSize);
    scene.add(axisHelper);
}

function addEvents()
{
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keypress", onKeyPress);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

var moveForward, moveBackward, moveRight, moveLeft;
var faceUp, faceDown, faceLeft, faceRight;
var moveSpeed = 10,
    rotSpeed = 0.2,
    scrollSpeed = 10;
var dMoveSpeed, dRotSpeed, dScrollSpeed;
var prevMouseX = 0,
    prevMouseY = 0;
var dMouseX, dMouseY;

function onKeyDown(event)
{
    switch (event.code)
    {
        case "KeyW":
            moveForward = true;
            break;

        case "KeyA":
            moveLeft = true;
            break;

        case "KeyS":
            moveBackward = true;
            break;

        case "KeyD":
            moveRight = true;
            break;

        case "ArrowLeft":
            faceLeft = true;
            break;

        case "ArrowRight":
            faceRight = true;
            break;
    }
}

function onKeyUp(event)
{
    switch (event.code)
    {
        case "KeyW":
            moveForward = false;
            break;

        case "KeyA":
            moveLeft = false;
            break;

        case "KeyS":
            moveBackward = false;
            break;

        case "KeyD":
            moveRight = false;
            break;

        case "ArrowLeft":
            faceLeft = false;
            break;

        case "ArrowRight":
            faceRight = false;
            break;
    }
}

function onKeyPress(event)
{
    switch (event.code)
    {
        case "Digit1":

            for (var i = 0; i < objsArray.children.length; i++)
            {
                if (objsArray.children[i].hasOwnProperty("material"))
                {
                    console.log(objsArray.children[i].hasOwnProperty("material"));
                    objsArray.children[i].material.wireframe = !objsArray.children[i].material.wireframe;
                }
            }
            break;

        case "KeyP":
            paused = !paused;
            break;
    }
}

function onMouseMove(event)
{
    dMouseX = event.movementX * dRotSpeed;

    camera.rotateY(dMouseX * -1);
}

function movePlayer()
{
    // if(faceUp)
    //     camera.rotateOnAxis(axisVector, 0.1);

    // if(faceDown)
    //     camera.rotateOnAxis(axisVector, -0.1);

    // if(faceLeft)
    //     camera.rotateY(dRotSpeed);

    // if(faceRight)
    //     camera.rotateY(dRotSpeed * -1);

    if (moveForward)
        camera.translateZ(dMoveSpeed * -1);

    if (moveBackward)
        camera.translateZ(dMoveSpeed);

    if (moveLeft)
        camera.translateX(dMoveSpeed * -1);

    if (moveRight)
        camera.translateX(dMoveSpeed);

    // camera.position.y = 1;
}

function movecubeArrays()
{
    for (var i = 0; i < cubeArray.length; i++)
    {
        var size = cubeArray[i].geometry.parameters.depth;

        if (cubeArray[i].position.z + size + dScrollSpeed <= floorSize / 2)
            cubeArray[i].translateZ(dScrollSpeed);
        else
        {
            cubeArray[i].position.x = randomGridPosition();
            cubeArray[i].position.z = (floorSize * -1) + size;
        }
    }
}

function updateHUD()
{
    document.getElementById("camera.x")
        .innerHTML = "camera.x = " + Math.round(camera.position.x * 1000) / 1000;
    document.getElementById("camera.y")
        .innerHTML = "camera.y = " + Math.round(camera.position.y * 1000) / 1000;
    document.getElementById("camera.z")
        .innerHTML = "camera.z = " + Math.round(camera.position.z * 1000) / 1000;
    document.getElementById("axis.y")
        .innerHTML = "axis.y = " + Math.round(THREE.Math.radToDeg(camera.rotation.y) * 1000) / 1000;
    document.getElementById("delta")
        .innerHTML = "deltaTime = " + Math.round(delta * 1000) / 1000;
}


function updateDeltas()
{
    delta = clock.getDelta();
    dMoveSpeed = moveSpeed * delta;
    dRotSpeed = rotSpeed * delta;
    dScrollSpeed = scrollSpeed * delta;
}

window.onload = function()
{
    initializeScene();
    initializeLights();
    initializeObjects();
    // initializeAudio();
    // initializeCanvas();
    setupScene();
    addHelpers();
    addEvents();
    animate();
}

function update()
{
    if (!paused)
    {
        updateDeltas();
        movePlayer();
        movecubeArrays();
        updateHUD();
    }
    else
        clock.stop();
}

function animate()
{
    update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}