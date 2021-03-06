// Your 3d scene will always need one of each of these
var scene, camera, renderer;

// And let's save a couple of objects as global variables
var sun, earth;

// Set up some init function (I like to call it when the window loads)
window.onload = function() {
  // Create a basic scene
  scene = new THREE.Scene();

  // Create a basic perspective camera
  var aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000);
  camera.position.z = 30;

  // Create a WebGL renderer    
  renderer = new THREE.WebGLRenderer();
  // Set it to the size of our window
  renderer.setSize( window.innerWidth, window.innerHeight );
  // Attach it to the body HTML element
  document.getElementById("container").appendChild( renderer.domElement );


  // At this point, you'd probably want to create some objects or lights
  // First, make a sphere that we can re-use
  var sphereGeometry = new THREE.SphereGeometry(5, 30, 30);

  // Now, create an empty object for the sun
  sun = new THREE.Object3D();

  // Create a mesh for the sun object. We're using a basic material, because
  // the sun doesn't need shading.
  var sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
  var sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);

  // Add it to our sun object
  sun.add(sunMesh);


  // Add a point light to the center of the world, for the sunlight
  var sunlight = new THREE.PointLight();
  scene.add(sunlight);
  
  var ambient = new THREE.AmbientLight(0x222222);
  scene.add(ambient);

  // Create an empty object for the earth. This will rotate around the sun.
  earth = new THREE.Object3D();
  // Offset the earth's position so that it rotates at a distance.
  earth.position.x = -15;

  // Create a mesh for the earth
  var earthTexture = new THREE.TextureLoader().load("textures/earth.jpg");
  var earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture, shininess: 0 });
  var earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  // This should be smaller than the sun, so scale it down uniformly.
  earthMesh.scale.set(0.3, 0.3, 0.3);
  earth.add(earthMesh);


  // Now, create a moon that rotates around the earth.
  var moonTexture = new THREE.TextureLoader().load("textures/moon.jpg");
  var moonMaterial = new THREE.MeshLambertMaterial({ map: moonTexture });
  var moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  // Scale it down and offset its position.
  moonMesh.scale.set(0.1, 0.1, 0.1);
  moonMesh.position.x = -3;

  // Add the moon object to our earth container, add our earth container to the
  // sun container, and add that to the scene. This sets up our object hierarchy.
  earth.add(moonMesh);
  sun.add(earth);
  scene.add(sun);


  // Now, set up a loop function for animation
  requestAnimationFrame( animate );
}

// Now, set up a looping function
function animate() {
  // Update the rotation of our sun and earth
  sun.rotation.y += 0.008;
  earth.rotation.y += 0.008;

  // Finish with a new render call
  renderer.render( scene, camera );

  // Tell our function to loop again on the next frame
  requestAnimationFrame( animate );
}