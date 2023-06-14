var camera, scene, renderer, loadedSphere01, copy01, copy02, copy03;
var mouseX = 0,
  mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var clock = new THREE.Clock();
init();
animate();
const newColor1 = new THREE.Color("rgb(102, 178, 154)");
const newColor2 = new THREE.Color("rgb(162, 84, 255)");
const newColor3 = new THREE.Color("rgb(99, 180, 255)");
const newColor4 = new THREE.Color("rgb(192, 62, 62)");
const newColor5 = new THREE.Color("rgb(255, 229, 127)");
const newColor6 = new THREE.Color("rgb(114, 125, 255)");
const newColor7 = new THREE.Color("rgb(255, 148, 106)");
const newColor8 = new THREE.Color("rgb(211, 236, 103)");
const newColor9 = new THREE.Color("rgb(236, 103, 103)");
const newColor10 = new THREE.Color("rgb(75, 196, 247)");
var material01 = new THREE.MeshLambertMaterial({
  color: 0x5949ea,
  transparent: true,
  opacity: 1.0
});
var material02 = new THREE.MeshLambertMaterial({
  color: 0xffc960,
  transparent: true,
  opacity: 1.0
});
var material03 = new THREE.MeshLambertMaterial({
  color: 0xfe5d5d,
  transparent: true,
  opacity: 1.0
});
var material04 = new THREE.MeshLambertMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 1.0
});

function init() {
  // basic scene
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  //renderer.setClearColor(0x000000, 0);
  document.getElementById("webgl_wrapper").appendChild(renderer.domElement);
  scene = new THREE.Scene();
  // near = 100;
  //far = 2000;
  // fogColor = '#000000';
  //  scene.fog = new THREE.Fog(fogColor, near, far);
  //  scene.background = new THREE.Color(fogColor);
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.y = 0;
  camera.position.z = 150;
  var manager = new THREE.LoadingManager();
  //manager.onProgress = function(item, loaded, total) {
  //console.log(item, loaded, total);
  //};
  var loader = new THREE.OBJLoader(manager);
  loader.load('js/half_sphere.obj', function(loadedobject01) {
    loadedobject01.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material01;
      }
    });
    copy01 = loadedobject01.clone();
    copy02 = loadedobject01.clone();
    copy03 = loadedobject01.clone();
    copy01.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material04;
      }
    });
    copy02.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material02;
      }
    });
    copy03.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material03;
      }
    });
    loadedSphere01 = loadedobject01;
    loadedobject01.scale.set(50, 50, 50);
    loadedobject01.position.set(-40, 20, 0);
    loadedobject01.rotation.z = -45;
    copy01.scale.set(50, 50, 50);
    copy01.position.set(-30, -30, 0);
    copy02.scale.set(50, 50, 50);
    copy02.position.set(40, 0, -20);
    copy02.rotation.z = 45;
    copy03.scale.set(50, 50, 50);
    copy03.position.set(0, 0, -10);
    copy03.rotation.x = -60;
    scene.add(loadedobject01);
    scene.add(copy01);
    scene.add(copy02);
    scene.add(copy03);
  });
  var dl02 = new THREE.DirectionalLight(0xffffff, 1.0);
  scene.add(dl02);
  dl02.position.set(40, 200, 200);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 10;
  mouseY = (event.clientY - windowHalfY) / 10;
}
var windowWidth = window.innerWidth;
if (windowWidth > 540) {
  window.addEventListener('resize', onWindowResize, false);
}

function animate() {
  setTimeout(function() {
    requestAnimationFrame(animate);
  }, 1000 / 25);
  render();
}

function render() {
  var delta = clock.getDelta();
  if (loadedSphere01) loadedSphere01.rotation.y -= 0.5 * delta;
  if (loadedSphere01) loadedSphere01.rotation.z += 0.3 * delta;
  if (copy01) copy01.rotation.z += 0.5 * delta;
  if (copy02) copy02.rotation.y += 0.3 * delta;
  if (copy02) copy02.rotation.z -= 0.4 * delta;
  if (copy03) copy03.rotation.y += 0.5 * delta;
  if (copy03) copy03.rotation.z -= 0.2 * delta;
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  camera.position.x += (mouseX - camera.position.x) / 20;
  camera.position.y += (mouseY - camera.position.y) / 20;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
