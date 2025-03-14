// Inisialisasi scene, kamera, dan renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tambahkan kontrol kamera
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Tambahkan cahaya
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Tambahkan loader MTL & OBJ
const mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('assets/');
mtlLoader.load('model.mtl', function (materials) {
    materials.preload();
    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/');
    objLoader.load('model.obj', function (object) {
        object.position.set(0, -1, 0);
        object.scale.set(1, 1, 1);
        scene.add(object);
    });
});

// Posisi awal kamera
camera.position.set(0, 1, 3);

// Animasi render
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Menyesuaikan ukuran saat window di-resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
