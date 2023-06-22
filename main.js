

import { OrbitControls } from 'https://unpkg.com/three@0.149.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.149.0/examples/jsm/loaders/GLTFLoader.js';

let mixer1;
let mixer2;
let mixer3;



const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );



const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



//const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//const material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

const gltfLoader = new GLTFLoader();
gltfLoader.load('Models/space_station_modules.glb' , (gltfScene) => {
    gltfScene.scene.position.set(0,-5,0);
    gltfScene.scene.scale.set(1,1,1);
    scene.add( gltfScene.scene );
})

gltfLoader.load('Models/space_station_modules.glb' , (gltfScene) => {
    gltfScene.scene.position.set(100,10,-5);
    gltfScene.scene.scale.set(1,1,1);
    scene.add( gltfScene.scene );
})

gltfLoader.load('Models/space_station_3.glb' , function (gltf) {
    gltf.scene.position.set(50,100,-5);
    gltf.scene.scale.set(100,100,100);
    const lake = gltf.scene;
    

    mixer1 = new THREE.AnimationMixer(lake);
    mixer1.clipAction(gltf.animations[0]).play();
    const delta = clock.getDelta();
    mixer1.update( delta );
    
    scene.add( lake );
    

})



gltfLoader.load('Models/space_station_4.glb' , function (gltf)  {
    gltf.scene.position.set(950,100,-5);
    gltf.scene.scale.set(25,25,25);
    const job = gltf.scene;
    
    mixer2 = new THREE.AnimationMixer(job);
    mixer2.clipAction(gltf.animations[0]).play();
    const delta = clock.getDelta();
    mixer2.update( delta );
    
    
    scene.add( job );
})
let jon = new THREE.PointLight(0x0000FF, 60, 920);
jon.position.set(950,100,-5);
scene.add(jon);

gltfLoader.load('Models/space_station_4.glb' ,  function (gltf)  {
    gltf.scene.position.set(-950,100,-5);
    gltf.scene.scale.set(25,25,25);
    const lab = gltf.scene;
    

    mixer3 = new THREE.AnimationMixer(lab);
    mixer3.clipAction(gltf.animations[0]).play();
    const delta = clock.getDelta();
    mixer3.update( delta );

 

    
    scene.add( lab );
})
let gary = new THREE.PointLight(0x0000FF, 60, 920);
gary.position.set(-950,100,-5);
scene.add(gary);

gltfLoader.load('space_train/scene.gltf' , (gltfScene) => {
    gltfScene.scene.position.set(-520,100,-5);
    gltfScene.scene.scale.set(10,10,10);
    scene.add( gltfScene.scene );
})
gltfLoader.load('space_train/scene.gltf' , (gltfScene) => {
    gltfScene.scene.position.set(520,100,-5);
    gltfScene.scene.scale.set(10,10,10);
    scene.add( gltfScene.scene );
})
gltfLoader.load('space_train/scene.gltf' , (gltfScene) => {
    gltfScene.scene.position.set(0,100,-520);
    gltfScene.scene.scale.set(10,10,10);
    gltfScene.scene.rotation.set(0, 90, 0);
    scene.add( gltfScene.scene );
})
gltfLoader.load('space_train/scene.gltf' , (gltfScene) => {
    gltfScene.scene.position.set(0,100,520);
    gltfScene.scene.scale.set(10,10,10);
    gltfScene.scene.rotation.set(0, 90, 0);
    scene.add( gltfScene.scene );
})

let light = new THREE.PointLight(0xFF000F, 60, 1000);
light.position.set(50,100,-5);
scene.add(light);









const spaceTexture = new THREE.TextureLoader().load('img/4kspacebg.jpg');
scene.background = spaceTexture;


const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = -325;
camera.position.y = 173;
camera.position.x = 408;


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    const delta = (clock.getDelta() / 2);
    
    
    
    mixer2.update( delta);
    mixer3.update( delta);
    mixer1.update( delta );
    
    controls.update();
   
    //scene.rotation.x += 0.01;
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    
    
}
animate();


console.log("Scene polycount:", renderer.info.render.triangles);
console.log("Active Drawcalls:", renderer.info.render.calls);
console.log("Textures in Memory", renderer.info.memory.textures);
console.log("Geometries in Memory", renderer.info.memory.geometries);
