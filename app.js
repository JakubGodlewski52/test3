





function WebGLSupported() {
    const canvas = document.getElementById('Canvas-WEBGL');
    const glSupport = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!glSupport) {
        return false;
    }
    return true;
}

if (!WebGLSupported()) {
    document.getElementById('Canvas-WEBGL').style.display = 'none';
    document.getElementById('text-block').style.display = 'none';
    document.getElementById('unsupported-message').style.display = 'block';
} else {
 
    if (typeof THREE === 'undefined') {
        document.getElementById('Canvas-WEBGL').style.display = 'none';
        document.getElementById('text-block').style.display = 'none';
        document.getElementById('unsupported-message').style.display = 'block';
    } else {
        const canvas = document.getElementById('Canvas-WEBGL');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('Canvas-WEBGL') });
        renderer.setSize(window.innerWidth, window.innerHeight);

        function resizeCanvas() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

    

        const test = new THREE.GLTFLoader();
        test.load('test.gltf', function (gltf){

           
                scene.add(gltf.scene);

                window.loadedModel = gltf.scene;
                
                animate();
            }, undefined, function (error) {
                console.error(error);
            });

        const ambientLight = new THREE.AmbientLight(0x404040, 1); 
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
            scene.add(directionalLight);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            if (window.loadedModel) {
                window.loadedModel.rotation.x += 0.003; // Rotacja wokół osi X
                
            }
            renderer.render(scene, camera);
        }
        animate();
    }
}