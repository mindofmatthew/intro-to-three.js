// You'll always need one of each of these
var renderer, scene, camera;

var controls, velocity;
var cameraHeight = 10; // Height of the camera off of the ground

// Our init function
window.onload = function() {
  // Basic initialization /////////////////////////////////////////
  // Create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Create scene
  scene = new THREE.Scene();
  
  // Create camera
  var fov = 45; // field of view
  var aspectRatio = window.innerWidth / window.innerHeight;
  var near = 1;
  var far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

  // Controls /////////////////////////////////////////////////////
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());

  // Allow people to enable and disable the pointer lock
  document.addEventListener('pointerlockchange', () => {
    controls.enabled = document.pointerLockElement === document.body;
  });

  document.body.addEventListener('click', () => {
    document.body.requestPointerLock();
  });

  // Keyboard controls
  velocity = new THREE.Vector3();
  document.addEventListener('keydown', e => {
    switch (event.keyCode) {
      case 38: // Forward
      case 87:
        velocity.z = -0.01;
        break;
      case 37: // Left
      case 65:
        velocity.x = -0.01;
        break;
      case 40: // Down
      case 83:
        velocity.z = 0.01;
        break;
      case 39: // Right
      case 68:
        velocity.x = 0.01;
        break;
      case 32: // Space
        velocity.y = 0.02;
    }
  });
  document.addEventListener('keyup', e => {
    switch (event.keyCode) {
      case 38: // Forward
      case 87:
      case 40: // Down
      case 83:
        velocity.z = 0;
        break;
      case 37: // Left
      case 65:
      case 39: // Right
      case 68:
        velocity.x = 0;
        break;
    }
  });

  
  // Create your scene here: ///////////////////////
  
  
  
  //////////////////////////////////////////////////
  
  requestAnimationFrame(animate);
}

var prevTimestamp = performance.now();

// Our looping function
function animate(timestamp) {
  var delta = timestamp - prevTimestamp;
  prevTimestamp = timestamp;
  
  // Animate your scene here ////////////////////////
  
  
  ///////////////////////////////////////////////////
  
  // Update the position of the camera
  controls.getObject().translateX( velocity.x * delta );
  controls.getObject().translateY( velocity.y * delta );
  controls.getObject().translateZ( velocity.z * delta );

  if (controls.getObject().position.y > cameraHeight) {
    velocity.y -= .001;
  } else {
    velocity.y = 0;
    controls.getObject().position.y = cameraHeight;
  }
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
