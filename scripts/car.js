import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/OBJLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

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

scene.background = new THREE.Color(0xffffff);
camera.position.z = 10;

function animate() {
	requestAnimationFrame(animate);
	if (car) {
		/*  car.rotation.x += 0.01;
        car.rotation.y += 0.01 */
	}

	renderer.render(scene, camera);
}

animate();
