const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

scene.background = new THREE.Color(0xe4e4e4);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
})
document.body.appendChild( renderer.domElement );


let keyboard = {
    up : false,
    down : false,
    left : false,
    right : false,
}
window.addEventListener("keydown", function(e) {
    if(e.key === "w") {
        keyboard.up = true;
    }
    if(e.key === "s") {
        keyboard.down = true;
    }
    if(e.key === "a") {
        keyboard.left = true;
    }
    if(e.key === "d") {
        keyboard.right = true;
    }
})
window.addEventListener("keyup", function(e) {
    if(e.key === "w") {
        keyboard.up = false;
    }
    if(e.key === "s") {
        keyboard.down = false;
    }
    if(e.key === "a") {
        keyboard.left = false;
    }
    if(e.key === "d") {
        keyboard.right = false;
    }
})


const geometry = new THREE.BoxGeometry(100, 0.1, 100);
const material = new THREE.MeshBasicMaterial( { color: 0x3e3e3e } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
camera.position.y = 3;


function animate() {
	requestAnimationFrame( animate );
    if(keyboard.up) { camera.rotation.x += 0.01 }
    if(keyboard.down) { camera.rotation.x -= 0.01 }
    if(keyboard.left) { camera.rotation.y += 0.01 }
    if(keyboard.right) { camera.rotation.y -= 0.01 }


	renderer.render( scene, camera );
}
animate();