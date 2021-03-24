// importing these scripts from the web keeps us from having to include them locally
// but also necessitates us using a local server
import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js'
import { PositionalAudioHelper } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/helpers/PositionalAudioHelper.js'

let scene, camera, renderer;

const startButton = document.getElementById( "startButton" )
startButton.addEventListener( 'click', init )

function init() {
    const overlay = document.getElementById( 'overlay' );
    overlay.remove();
    
    const container = document.getElementById( 'container' )

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( 3, 2, 3 ); // our starting view position

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 ); // background color
    scene.fog = new THREE.Fog( 0xa0a0a0, 2, 20 ); // fog is interesting, try commenting it out

    // boiler plate - now we add lights to the scene
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 20, 0 ); // this will be overhead
    scene.add( hemiLight );

    // boiler plate - this light will determined the shadow that we see on our objects
    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 5, 5, 0 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 1;
    dirLight.shadow.camera.bottom = - 1;
    dirLight.shadow.camera.left = - 1;
    dirLight.shadow.camera.right = 1;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 20;
    scene.add( dirLight );

    
    // this mesh plane is our floor
    const floorGeometry = new THREE.PlaneGeometry( 50, 50 )
    const floorMaterial = new THREE.MeshPhongMaterial( { color: 0xc28f4c, depthWrite: false } )
    const floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
    floorMesh.rotation.x = - Math.PI / 2;
    floorMesh.receiveShadow = true; // to show the shadow from our objects
    scene.add( floorMesh );
    
    // helping us percieve the 3D layout of the space we're creating
    const grid = new THREE.GridHelper( 50, 50, 0x888888, 0x888888 );
    scene.add( grid );

    const wallGeometry = new THREE.BoxGeometry( 2, 1, 0.1 );
    const wallMaterial = new THREE.MeshBasicMaterial( { color: 0x35d4a4, transparent: true, opacity: 0.5 } );

    const wall = new THREE.Mesh( wallGeometry, wallMaterial );
    wall.position.set( 0, 0.5, 0 );
    scene.add( wall );

    let sphereGeometry = new THREE.SphereGeometry( 0.25, 0, 0 );
    let sphereMaterial = new THREE.MeshPhongMaterial( { color: 0x8f34eb } );
    let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.set ( 0, 0.25, 2);
    
    sphere.castShadow = true;
    scene.add (sphere);

    let sphere2 = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere2.position.set ( 0, 0.25, -2);
    sphere2.rotation.x = Math.PI;
    sphere2.castShadow = true;
    scene.add (sphere2);

    //listener
    const listener = new THREE.AudioListener()
    camera.add( listener );

    const audioElement1 = document.getElementById( 'track1' )
    audioElement1.play();
    camera.add (audioElement1)
    
    //audio play
    const audioElement2 = document.getElementById( 'track2' )
    audioElement2.play();

    //positional audio
    const positionalAudio2 = new THREE.PositionalAudio( listener )
    positionalAudio2.setMediaElementSource ( audioElement2 )
    positionalAudio2.setRefDistance ( 1 );
    positionalAudio2.setDirectionalCone (180, 230, 0.1,);

    const helper2 = new PositionalAudioHelper (positionalAudio2, 2 )
    positionalAudio2.add (helper2)
    sphere.add( positionalAudio2 )

    //audio play
    const audioElement3 = document.getElementById( 'track3' )
    audioElement3.play();

    //positional audio
    const positionalAudio3 = new THREE.PositionalAudio( listener )
    positionalAudio3.setMediaElementSource ( audioElement3 )
    positionalAudio3.setRefDistance ( 1 );
    positionalAudio3.setDirectionalCone (180, 230, 0.1,);

    const helper3 = new PositionalAudioHelper (positionalAudio3, 2 )
    positionalAudio3.add (helper3)
    sphere2.add( positionalAudio3 )



    // boiler plate - setting up rendering from 3D to 2D
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );


     // boiler plate - setting up the basic controls for navigation
     const controls = new OrbitControls( camera, renderer.domElement );
     controls.target.set( 0, 0.1, 0 );
     controls.update();
     controls.minDistance = 0.5;
     controls.maxDistance = 10;
     controls.maxPolarAngle = 0.5 * Math.PI;

     animate();
}

function animate(){
    requestAnimationFrame ( animate );
    renderer.render( scene, camera );



}


