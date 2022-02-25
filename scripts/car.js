import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader.js";
const canvas = document.querySelector(".car");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 1, 1000);
camera.position.z = 10;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialiasing:true});
renderer.setClearColor(0x000000,0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = false;
controls.minDistance = 12;
controls.maxDistance = 15;
controls.minPolarAngle = degrees_to_radians(67);
controls.maxPolarAngle = degrees_to_radians(67);
controls.target.add(new THREE.Vector3(0,0,2));

let keyLight = new THREE.DirectionalLight(new THREE.Color("hsl(30, 100%, 75%)"), 1.0);
keyLight.position.set(-100, 0, 100);

let fillLight = new THREE.DirectionalLight(new THREE.Color("hsl(240, 100%, 75%)"), 0.75);
fillLight.position.set(100, 0, 100);

let backLight = new THREE.DirectionalLight(0xffffff, 0.5);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

const loader = new OBJLoader();
let car;

loader.load(
	// resource URL
	"../assets/car.obj",

	// called when resource is loaded
	(object) => {
		car = object;
		car.scale.x = 0.05;
		car.scale.y = 0.05;
		car.scale.z = 0.05;
		scene.add(car);

		console.log(car);
	},
	// called when loading is in progress
	(xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),

	console.log
);


function animate() {
	requestAnimationFrame(animate);
	if (car) {
		/*  car.rotation.x += 0.01;
        car.rotation.y += 0.01 */
	}

	renderer.render(scene, camera);
}

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function resizeCanvasToDisplaySize() {
	const canvas = renderer.domElement;
	// look up the size the canvas is being displayed
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
  
	// you must pass false here or three.js sadly fights the browser
	renderer.setSize(width, height, false);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
  
	// update any render target sizes here
  }
  
  const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
  resizeObserver.observe(canvas, {box: 'content-box'});

animate();
