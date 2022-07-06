import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader";
//TODO - don't import seperately for files
// make cleaner structure for different canvas
const button = document.getElementById("showcase-btn");
const closeBtn = document.getElementById("showcase-close-btn");
const loadingScreen = document.getElementById("loading-container");
const canvas = document.getElementById("car-canvas");

button.onclick = function () {
  loadingScreen.classList.add("active");
  setTimeout(function () {
    // dummy loading for now
    canvas.classList.add("active");
    loadingScreen.classList.remove("active");
    closeBtn.classList.add("active");
  }, 3000);
};
closeBtn.onclick = function () {
  closeBtn.classList.remove("active");
  canvas.classList.remove("active");
};

(function () {
  const maxHeight = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    1,
    50
  );
//   camera.near = 1000
  camera.far = 5000
  camera.position.z = 25;
  camera.position.y = 5;
  camera.position.x = 12;
  const wheels = [];

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: false,
    antialias: true,
  });
  renderer.setClearColor(0x000000, 0);

  const controls = new OrbitControls(camera, renderer.domElement);
/*   controls.enablePan = false;
  controls.enableDamping = false;
  controls.campingFactor = 0.25;
  controls.enableZoom = false;
  controls.minDistance = 13;
  controls.maxDistance = 13;
  controls.minPolarAngle = degrees_to_radians(67);
  controls.maxPolarAngle = degrees_to_radians(67); */
  controls.update();
  //controls.target.add(new THREE.Vector3(0, 0, 2)); 

  const texture = new THREE.TextureLoader().load('../assets/textures/asphalt.jpg', tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1,1)
  });


  let showcaseFloor = new THREE.Mesh(
    new THREE.PlaneGeometry( 50, 200 ),
    new THREE.MeshStandardMaterial({ map: texture, color: 0xffffff, side: THREE.DoubleSide })
  );
  showcaseFloor.frustumCulled = false
  showcaseFloor.rotateX(-Math.PI * 0.5)
  showcaseFloor.rotateZ(-Math.PI/2)
  //showcaseFloor.position.y = -0.5;
  showcaseFloor.receiveShadow = true;
  scene.add(showcaseFloor);

  let fillLight = new THREE.DirectionalLight(
    new THREE.Color(0xffffff),
    2
  );
  fillLight.position.set(0,20,0);
  scene.add(fillLight);


  let car;
  const fbxLoader = new FBXLoader();
  fbxLoader
    .loadAsync("../assets/f1_carog.fbx", (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    })
    .then((object) => {
      car = object;
      car.position.x -= 6.5;
      car.position.y += 1.4;
      //car.position.y += car.scale.y;
      /* car.scale.x = 0.1;
      car.scale.y = 0.1;
      car.scale.z = 0.1; */
      scene.add(car);
      console.log(car);

      car.children.forEach(function (child) {
        if (child.isGroup && child.name.startsWith("wheel")) {
          const mesh = child.children[0].children[0];
          console.log(mesh);
          wheels.push(mesh);
        }
      });
    })
    .catch(console.log);

  function animate() {
    requestAnimationFrame(animate);
    //showcaseFloor.translateY(1);

    if (car) {
      for (let i = 0; i < wheels.length; i++) {
        let wheel = wheels[i];
        wheel.rotation.y += 0.1;

      }
    }
    renderer.render(scene, camera);
  }

  function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = Math.min((canvas.clientHeight * pixelRatio) | 0, maxHeight);
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      // pass false here or three.js fights browser
      renderer.setSize(width, height, false);
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update any render target sizes here
  }

  const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
  resizeObserver.observe(canvas, { box: "content-box" });

  animate();
})();
